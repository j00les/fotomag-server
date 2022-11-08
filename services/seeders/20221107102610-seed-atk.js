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

    await queryInterface.bulkInsert("ATKs", [
      {
        name: "Toko Hanif",
        address: "Jakarta Selatan",
        priceColor: 2000,
        priceBlack: 1000,
        priceJilid: 5000,
        UserId: 2,
        location: Sequelize.fn(
          "ST_GeomFromText",
          "POINT(106.78284657797572 -6.260860859487839)"
        ),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Toko Chandra",
        address: "Jakarta Selatan",
        priceColor: 1000,
        priceBlack: 500,
        priceJilid: 5000,
        UserId: 3,
        location: Sequelize.fn(
          "ST_GeomFromText",
          "POINT(106.78225602493622 -6.263653631620665)"
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
    await queryInterface.bulkDelete("ATKs", null);
  },
};
