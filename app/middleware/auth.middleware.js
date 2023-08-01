const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const accessToken = authHeader.split(" ")[1];

    if (accessToken) {
      try {
        const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
        req.user = decoded;
        next();
      } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
      }
    } else {
      return res
        .status(401)
        .json({ token: accessToken, message: "Authentication token missing" });
    }
  }
};

module.exports = authMiddleware;
