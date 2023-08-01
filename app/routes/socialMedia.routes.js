const express = require("express");
const SocialMediaController = require("../controllers/SocialMedia.controller.js");
const authMiddleware = require("../middleware/auth.middleware.js");
const loggerMiddleware = require("../middleware/logger.middleware.js");

const router = express.Router();

// Menggunakan middleware di semua route
router.use(loggerMiddleware);

// Route mendapatkan data social media
router.get("/", SocialMediaController.getSocialMedia);

// Route mengubah data social media
router.post("/update", authMiddleware, SocialMediaController.updateSocialMedia);

module.exports = router;
