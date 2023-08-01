const Progress = require("../../models/Progress.js");

class ProgressController {
  static async getProgress(req, res) {
    try {
      const progress = await Progress.findByPk(1);
      return res.json({ success: true, data: progress });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "Failed to get progress",
        error: error.message,
      });
    }
  }

  static async updateProgress(req, res) {
    const { progress_pointer } = req.body;

    try {
      const progress = await Progress.findByPk(1);
      if (!progress) {
        return res
          .status(404)
          .json({ success: false, message: "Progress not found" });
      }

      progress.progress_pointer = progress_pointer;
      await progress.save();

      return res.json({
        success: true,
        message: "Progress updated successfully!",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "Failed to update progress",
        error: error.message,
      });
    }
  }
}

module.exports = ProgressController;
