const { Sequelize } = require("../models");

[
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
      "POINT(106.63415572806501 -6.191345155768045)"
    ),
  },
];

-6.191345155768045, 106.63415572806501 - 6.2648126454308635, 106.73179106665565;
