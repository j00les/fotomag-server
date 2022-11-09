const {
  sequelize,
  User,
  Transaction,
  BalanceMutation,
  ATK,
  Courier,
} = require("../models");
const { queryInterface } = sequelize;
const request = require("supertest");
const app = require("../app");
const {
  createAccessToken,
  verifyAccessToken,
  hashingPassword,
} = require("../helper/helper");

let accessToken;
let signedAccessToken;
let accessToken2;
let signedAccessToken2;
let accessToken3;
let signedAccessToken3;

beforeAll(async () => {
  await queryInterface.bulkInsert(
    "Users",
    [
      {
        name: "ucok1", //ID : 1
        email: "ucok1@mail.com",
        password: hashingPassword("asd123"),
        // balance: 0,
        address:
          "Jl. Sultan Iskandar Muda No.7, RT.5/RW.9, Kby. Lama Sel., Kec. Kby. Lama, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12240",
        role: "Customer",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "ucok2", //ID : 2
        email: "ucok2@mail.com",
        password: hashingPassword("asd123"),
        // balance: 0,
        address:
          "Jl. Sultan Iskandar Muda No.7, RT.5/RW.9, Kby. Lama Sel., Kec. Kby. Lama, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12240",
        role: "Merchant",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "ucokKismin", //ID: 3
        email: "ucokKismin@mail.com",
        password: hashingPassword("asd123"),
        // balance: 0,
        address:
          "Jl. Sultan Iskandar Muda No.7, RT.5/RW.9, Kby. Lama Sel., Kec. Kby. Lama, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12240",
        role: "Customer",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    null
  );
  await queryInterface.bulkInsert("ATKs", [
    {
      name: "Toko Maju Jaya", //ID: 1
      address: "Jakarta",
      priceColor: 2000,
      priceBlack: 1000,
      priceJilid: 10000,
      location: sequelize.fn(
        "ST_GeomFromText",
        "POINT(106.78284657797572 -6.260860859487839)"
      ),
      UserId: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);
  let testUser = await User.findByPk(1);
  const payload = {
    id: testUser.id,
    email: testUser.email,
  };
  let testUser2 = await User.findByPk(3);
  const payload2 = {
    id: testUser2.id,
    email: testUser2.email,
  };

  accessToken = createAccessToken(payload);
  signedAccessToken = verifyAccessToken(accessToken);
  accessToken2 = createAccessToken(payload2);
  signedAccessToken2 = verifyAccessToken(accessToken2);

  await queryInterface.bulkInsert("Couriers", [
    {
      name: "kurirUcok", //ID : 1
      email: "kurirUcok@mail.com",
      password: hashingPassword("asd123"),
      location: sequelize.fn(
        "ST_GeomFromText",
        "POINT(37.4220936 -122.083922)"
      ),
      AtkId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);

  let testKurir = await Courier.findByPk(1);
  const payload3 = {
    id: testKurir.id,
    email: testKurir.email,
  };
  console.log(payload3, "INI PAYLOAD3 DARI TEST<><><><><><><><>");
  accessToken3 = createAccessToken(payload3);
  signedAccessToken3 = verifyAccessToken(accessToken3);

  await queryInterface.bulkInsert("Transactions", [
    {
      //ID: 1
      fileURL:
        "https://res.cloudinary.com/dz0nxnyqq/image/upload/v1667553102/fotomagPDF/dlbzejujhyf5ruic1tm2.pdf",
      totalPages: 13,
      colorVariant: "Berwarna",
      duplicate: 2,
      totalPrice: 62000,
      isJilid: "YES",
      address: "Jakarta",
      status: "Delivered",
      location: sequelize.fn(
        "ST_GeomFromText",
        "POINT(37.4220936 -122.083922)"
      ),
      AtkId: 1,
      UserId: 1,
      CourierId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);
});

afterAll(async () => {
  await queryInterface.bulkDelete("Users", null, {
    truncate: true,
    restartIdentity: true,
    cascade: true,
  });
  await queryInterface.bulkDelete("Transactions", null, {
    truncate: true,
    restartIdentity: true,
    cascade: true,
  });
  await queryInterface.bulkDelete("BalanceMutations", null, {
    truncate: true,
    restartIdentity: true,
    cascade: true,
  });
  await queryInterface.bulkDelete("ATKs", null, {
    truncate: true,
    restartIdentity: true,
    cascade: true,
  });
  await queryInterface.bulkDelete("Couriers", null, {
    truncate: true,
    restartIdentity: true,
    cascade: true,
  });
});

jest.setTimeout(30000);

describe("User trying to change status translation to success", () => {
    test("Should be error because no data in mutation table", () => {
        return request(app)
        .patch('/transaction/success/1')
        .set("access_token", accessToken)
        .then((response) => {
            expect(response.statusCode).toBe(400)
            expect(response.body).toHaveProperty("message", expect.any(String))
        })
    })
})