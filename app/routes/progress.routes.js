const express = require("express");
const ProgressController = require("../controllers/Progress.controller.js");
const authMiddleware = require("../middleware/auth.middleware.js");
const loggerMiddleware = require("../middleware/logger.middleware.js");

const router = express.Router();

// Menggunakan middleware di semua route
router.use(loggerMiddleware);

// Route Mendapatkan data progress
router.get("/", ProgressController.getProgress);

// Route mengubah data progress
router.post("/update", authMiddleware, ProgressController.updateProgress);

module.exports = router;
