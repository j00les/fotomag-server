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
     * 4. taufik
     * fadil
     * nabil
     * sukarman
     * agung
     * fahrul
     * adib
     * wandi
     * melisa
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
      {
        name: "Toko Taufik",
        address: "Jakarta Selatan",
        priceColor: 2000,
        priceBlack: 1000,
        priceJilid: 8000,
        UserId: 4,
        location: Sequelize.fn(
          "ST_GeomFromText",
          "POINT(106.78211682822621 -6.259726761849436)"
        ),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Toko Fadil",
        address: "Jakarta Selatan",
        priceColor: 2000,
        priceBlack: 500,
        priceJilid: 7000,
        UserId: 5,
        location: Sequelize.fn(
          "ST_GeomFromText",
          "POINT(106.77989242873002 -6.260008804689074)"
        ),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Toko Nabil",
        address: "Jakarta Selatan",
        priceColor: 2000,
        priceBlack: 1000,
        priceJilid: 5000,
        UserId: 6,
        location: Sequelize.fn(
          "ST_GeomFromText",
          "POINT(106.78192233134618 -6.258771692540419)"
        ),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Toko Sukarman",
        address: "Jakarta Selatan",
        priceColor: 3000,
        priceBlack: 1000,
        priceJilid: 4000,
        UserId: 7,
        location: Sequelize.fn(
          "ST_GeomFromText",
          "POINT(106.77923379678161 -6.2590916061830475)"
        ),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Toko Agung",
        address: "Jakarta Selatan",
        priceColor: 1500,
        priceBlack: 100,
        priceJilid: 5000,
        UserId: 8,
        location: Sequelize.fn(
          "ST_GeomFromText",
          "POINT(106.78308400385306 -6.259945394263344)"
        ),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Toko Fahrul",
        address: "Jakarta Selatan",
        priceColor: 3000,
        priceBlack: 1500,
        priceJilid: 5000,
        UserId: 9,
        location: Sequelize.fn(
          "ST_GeomFromText",
          "POINT(106.78305828417723 -6.259153708752021)"
        ),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Toko Adib",
        address: "Jakarta Selatan",
        priceColor: 2000,
        priceBlack: 1000,
        priceJilid: 6000,
        UserId: 10,
        location: Sequelize.fn(
          "ST_GeomFromText",
          "POINT(106.77984346765768 -6.260919135773261)"
        ),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Toko Wandi",
        address: "Jakarta Selatan",
        priceColor: 3000,
        priceBlack: 2000,
        priceJilid: 9000,
        UserId: 11,
        location: Sequelize.fn(
          "ST_GeomFromText",
          "POINT(106.78023980903542 -6.261901390622651)"
        ),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Toko Melisa",
        address: "Jakarta Selatan",
        priceColor: 3000,
        priceBlack: 2000,
        priceJilid: 9000,
        UserId: 12,
        location: Sequelize.fn(
          "ST_GeomFromText",
          "POINT(106.78368269075936 -6.261433860079767)"
        ),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Toko Frataf",
        address: "Tanggerang",
        priceColor: 3000,
        priceBlack: 2000,
        priceJilid: 9000,
        UserId: 13,
        location: Sequelize.fn(
          "ST_GeomFromText",
          "POINT(106.63415572806501 -6.191345155768045)"
        ),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Toko Reza",
        address: "Bogor",
        priceColor: 3000,
        priceBlack: 2000,
        priceJilid: 9000,
        UserId: 13,
        location: Sequelize.fn(
          "ST_GeomFromText",
          "POINT(106.83845728340563 -6.602018762456079)"
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
