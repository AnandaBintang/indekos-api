const express = require("express");
const loggerMiddleware = require("../middleware/logger.middleware.js");
const authMiddleware = require("../middleware/auth.middleware.js");
const AuthController = require("../controllers/Auth.controller.js");

const router = express.Router();

// Menggunakan logger middleware di semua routes
router.use(loggerMiddleware);

// Rute untuk mendaftar pengguna baru
router.post("/register", AuthController.register);

// Rute untuk masuk (login) pengguna
router.post("/login", AuthController.login);

// Rute untuk refresh token
router.post("/refresh-token", AuthController.refreshToken);

// Rute untuk check authorization
router.get("/check-authorization", authMiddleware, AuthController.checkAuth);

module.exports = router;
