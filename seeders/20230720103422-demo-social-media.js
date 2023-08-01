"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Social_Media", [
      {
        instagram: "https://www.instagram.com",
        youtube: "https://www.youtube.com",
        whatsapp: "https://www.whatsapp.com",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Social_Media", null, {});
  },
};
