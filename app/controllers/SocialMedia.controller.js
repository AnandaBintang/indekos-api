const SocialMedia = require("../../models/SocialMedia");

class SocialMediaController {
  static async getSocialMedia(req, res) {
    try {
      const socialMedia = await SocialMedia.findByPk(1);
      return res.json({ success: true, data: socialMedia });
    } catch {
      error;
    }
    {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "Failed to get Social Media",
        error: error.message,
      });
    }
  }

  static async updateSocialMedia(req, res) {
    const { instagram, youtube, whatsapp } = req.body;

    try {
      const sosmed = await SocialMedia.findByPk(1);
      if (!sosmed) {
        return res
          .status(404)
          .json({ success: false, message: "Social media not found" });
      }

      sosmed.instagram = instagram;
      sosmed.youtube = youtube;
      sosmed.whatsapp = whatsapp;

      await sosmed.save();

      return res.json({
        success: true,
        message: "Social Media updated successfully!",
      });
    } catch (error) {
      console.log(error);
      return (
        res,
        status(500).json({
          success: false,
          message: "Failed to update Social Media",
          error: error.message,
        })
      );
    }
  }
}

module.exports = SocialMediaController;
