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

    await queryInterface.bulkInsert("Couriers", [
      {
        name: "Kurir Chandra",
        email: "kurir1@gmail.com",
        password: hashingPassword("12345"),
        AtkId: 2,
        location: Sequelize.fn(
          "ST_GeomFromText",
          "POINT(106.79752149181697 -6.275811179543664)"
        ),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Kurir Hanif",
        email: "kurir2@gmail.com",
        password: hashingPassword("12345"),
        AtkId: 1,
        location: Sequelize.fn(
          "ST_GeomFromText",
          "POINT(106.77541941537893 -6.266292982279224)"
        ),
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
    await queryInterface.bulkDelete("Couriers", null);
  },
};
