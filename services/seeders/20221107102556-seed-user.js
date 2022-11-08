"use strict";

const { hashingPassword } = require("../helper/helper");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    await queryInterface.bulkInsert("Users", [
      {
        name: "Alex",
        email: "alex@gmail.com",
        password: hashingPassword("12345"),
        balance: 0,
        address: "Jakarta Utara",
        role: "Customer",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Hanif",
        email: "hanif@gmail.com",
        password: hashingPassword("12345"),
        balance: 0,
        address: "Jakarta Selatan",
        role: "Merchant",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Chandra",
        email: "chandra@gmail.com",
        password: hashingPassword("12345"),
        balance: 0,
        address: "Jakarta Barat",
        role: "Merchant",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Users", null);
  },
};
