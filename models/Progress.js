const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/sequelize.js");

class Progress extends Model {
  static associate(models) {
    // define association here
  }
}

Progress.init(
  {
    progress_pointer: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [
          ["pre-production", "production", "post-production", "launching"],
        ],
      },
    },
  },
  {
    sequelize,
    modelName: "Progress",
    tableName: "Progress",
  }
);

module.exports = Progress;
