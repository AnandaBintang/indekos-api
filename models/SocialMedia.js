const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/sequelize.js");

class SocialMedia extends Model {
  static associate(models) {
    // define association here
  }
}

SocialMedia.init(
  {
    instagram: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    youtube: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    whatsapp: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "SocialMedia",
    tableName: "Social_Media",
  }
);

module.exports = SocialMedia;
