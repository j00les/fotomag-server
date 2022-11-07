const { Sequelize } = require("../models");

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
  },
];
