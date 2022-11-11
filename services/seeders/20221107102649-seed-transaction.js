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
    await queryInterface.bulkInsert(
      "Transactions",
      [
        {
          fileURL: "http://fileboongan",
          totalPages: 10,
          colorVariant: "Berwarna",
          duplicate: 2,
          totalPrice: 25000,
          isJilid: "YES",
          address: "Jakarta",
          AtkId: 2,
          UserId: 1,
          status: "Pending",
          CourierId: 1,
          location: Sequelize.fn(
            "ST_GeomFromText",
            "POINT(106.7909848027867 -6.283080008621486)"
          ),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Transactions", null);
  },
};
