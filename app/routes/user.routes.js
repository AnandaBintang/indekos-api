const express = require("express");
const UserController = require("../controllers/User.controller.js");
const authMiddleware = require("../middleware/auth.middleware.js");
const loggerMiddleware = require("../middleware/logger.middleware.js");

const router = express.Router();

// Menggunakan middleware di semua routes
router.use(authMiddleware, loggerMiddleware);

// Rute mendapat semua data user
router.get("/", UserController.getAll);
router.get("/profile", UserController.getProfile);
router.post("/update", UserController.updateUser);
router.post("/update-password", UserController.updatePassword);

module.exports = router;
