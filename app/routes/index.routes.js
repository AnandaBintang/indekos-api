const express = require("express");

const userRoutes = require("./user.routes.js");
const authRoutes = require("./auth.routes.js");
const progressRoutes = require("./progress.routes.js");
const socialMediaRoutes = require("./socialMedia.routes.js");

const router = express.Router();

router.use("/users", userRoutes);
router.use("/auth", authRoutes);
router.use("/progress", progressRoutes);
router.use("/social-media", socialMediaRoutes);

module.exports = router;
