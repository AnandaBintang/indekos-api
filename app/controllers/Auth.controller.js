const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../../models/User.js");

class AuthController {
  static async login(req, res) {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ where: { email } });

      if (!user) {
        return res
          .status(401)
          .json({ success: false, message: "Invalid email or password" });
      }

      const passwordMatch = await user.comparePassword(password);

      if (!passwordMatch) {
        return res
          .status(401)
          .json({ success: false, message: "Invalid email or password" });
      }

      // Jika autentikasi berhasil, buat token JWT
      const accessToken = jwt.sign(
        { email: user.email },
        process.env.JWT_SECRET,
        {
          expiresIn: process.env.JWT_EXPIRATION,
        }
      );

      // Buat refreshToken
      const refreshToken = jwt.sign(
        { email: user.email },
        process.env.REFRESH_TOKEN_SECRET,
        {
          expiresIn: process.env.REFRESH_TOKEN_EXPIRATION,
        }
      );

      // mengirimkan respons
      return res.json({
        success: true,
        token: {
          accessToken: accessToken,
          refreshToken: refreshToken,
        },
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: "Failed to log in",
        error: error.message,
      });
    }
  }

  static async register(req, res) {
    const { name, email, password } = req.body;

    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      console.log(process.env.DB_USER);
      const user = await User.create({ name, email, password: hashedPassword });

      return res.status(201).json({
        success: true,
        message: "User registered successfully",
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        },
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: "Failed to register user",
        error: error.message,
      });
    }
  }

  static async refreshToken(req, res) {
    const { refreshToken } = req.body;

    // Cek apakah refreshToken ada
    if (!refreshToken) {
      return res
        .status(400)
        .json({ success: false, message: "Refresh token not provided" });
    }

    try {
      // Verifikasi refreshToken
      const decoded = jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET
      );

      // Buat token JWT baru
      const accessToken = jwt.sign(
        { email: decoded.email },
        process.env.JWT_SECRET,
        {
          expiresIn: process.env.JWT_EXPIRATION,
        }
      );

      return res.json({ success: true, accessToken });
    } catch (error) {
      console.error(error);
      return res.status(401).json({
        success: false,
        message: "Invalid refresh token",
        error: error.message,
      });
    }
  }

  static async checkAuth(req, res) {
    return res.json({ success: true });
  }
}

module.exports = AuthController;
