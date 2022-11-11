const { Sequelize } = require("../models");

[
  {
    name: "Kurir Chandra",
    email: "kurir1@gmail.com",
    password: "12345",
    AtkId: 2,
    location: Sequelize.fn(
      "ST_GeomFromText",
      "POINT(106.79752149181697 -6.275811179543664)"
    ),
  },
  {
    name: "Kurir Hanif",
    email: "kurir2@gmail.com",
    password: "12345",
    AtkId: 1,
    location: Sequelize.fn(
      "ST_GeomFromText",
      "POINT(106.77541941537893 -6.266292982279224)"
    ),
  },
];
