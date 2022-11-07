let dataC = require("../data/courier");
const { hashingPassword } = require("../helper/helper");
("use strict");

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
    dataC.forEach((el) => {
      el.password = hashingPassword(el.password);
      el.createdAt = el.updatedAt = new Date();
    });
    await queryInterface.bulkInsert("Couriers", dataC, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Couriers", null);
  },
};
