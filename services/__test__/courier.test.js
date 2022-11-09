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
let accessToken4;
let signedAccessToken4;

beforeAll(async () => {
  await queryInterface.bulkInsert(
    "Users",
    [
      {
        name: "ucok1", //ID : 1
        email: "ucok1@mail.com",
        password: "asd123",
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
        password: "asd123",
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
        password: "asd123",
        // balance: 0,
        address:
          "Jl. Sultan Iskandar Muda No.7, RT.5/RW.9, Kby. Lama Sel., Kec. Kby. Lama, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12240",
        role: "Customer",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "ucokKismin2", //ID: 3
        email: "ucokKismin2@mail.com",
        password: "asd123",
        // balance: 0,
        address:
          "Jl. Sultan Iskandar Muda No.7, RT.5/RW.9, Kby. Lama Sel., Kec. Kby. Lama, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12240",
        role: "Merchant",
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
        "POINT(37.4220936 -122.083922)"
      ),
      UserId: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "Toko Mundur Jaya", //ID: 1
      address: "Jakarta",
      priceColor: 2000,
      priceBlack: 1000,
      priceJilid: 10000,
      location: sequelize.fn(
        "ST_GeomFromText",
        "POINT(37.4220936 -122.083922)"
      ),
      UserId: 4,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);
  let testUser = await User.findByPk(1);
  const payload = {
    id: testUser.id,
  };
  let testUser2 = await User.findByPk(2);
  const payload2 = {
    id: testUser2.id,
  };

  accessToken = createAccessToken(payload);
  signedAccessToken = verifyAccessToken(accessToken);
  accessToken2 = createAccessToken(payload2);
  signedAccessToken2 = verifyAccessToken(accessToken2);

  await queryInterface.bulkInsert(
    "Couriers",
    [
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
      {
        name: "kurir2", //ID : 1
        email: "kurir2@mail.com",
        password: hashingPassword("asd123"),
        location: sequelize.fn(
          "ST_GeomFromText",
          "POINT(37.4220936 -122.083922)"
        ),
        AtkId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    {}
  );
  let testUser3 = await Courier.findByPk(1);
  // console.log(testUser3, "access token <<<<<<");
  const payload3 = {
    id: testUser3.id,
    email: testUser3.email,
  };
  let testKurir = await Courier.findByPk(2);
  const payload4 = {
    id: testKurir.id,
    email: testKurir.email,
  };

  accessToken4 = createAccessToken(payload4);
  signedAccessToken4 = verifyAccessToken(accessToken4);
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
      status: "Done",
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
    {
      //ID: 2
      fileURL:
        "https://res.cloudinary.com/dz0nxnyqq/image/upload/v1667553102/fotomagPDF/dlbzejujhyf5ruic1tm2.pdf",
      totalPages: 13,
      colorVariant: "Berwarna",
      duplicate: 2,
      totalPrice: 62000,
      isJilid: "YES",
      address: "Jakarta",
      status: "Done",
      location: sequelize.fn(
        "ST_GeomFromText",
        "POINT(37.4220936 -122.083922)"
      ),
      AtkId: 2,
      UserId: 2,
      CourierId: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);
  await queryInterface.bulkInsert("BalanceMutations", [
    {
      nominal: 62000,
      UserId: 1,
      TransactionId: 1,
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
  await queryInterface.bulkDelete("BalanceMutations", null, {
    truncate: true,
    restartIdentity: true,
    cascade: true,
  });
});

describe("Get All Courier", () => {
  test("Get all courier", () => {
    return request(app)
      .get("/courier")
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBeGreaterThan(0);
      });
  });
});

describe("Courier login to app", () => {
  test("Login with correct input", () => {
    return request(app)
      .post("/login")
      .send({
        email: "kurirUcok@mail.com",
        password: "asd123",
      })
      .then((response) => {
        // console.log(response);
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty(
          "access_token",
          expect.any(String)
        );
        expect(response.body).toHaveProperty("role", "Courier");
      });
  });

  test("Login with wrong email input", () => {
    return request(app)
      .post("/login")
      .send({
        email: "kurirUcok12345@mail.com",
        password: "asd123",
      })
      .then((response) => {
        // console.log(response);
        expect(response.statusCode).toBe(401);
        expect(response.body).toHaveProperty(
          "message",
          "Invalid email/password"
        );
      });
  });

  test("Login with wrong password input", () => {
    return request(app)
      .post("/login")
      .send({
        email: "kurirUcok@mail.com",
        password: "asd12345",
      })
      .then((response) => {
        // console.log(response);
        expect(response.statusCode).toBe(401);
        expect(response.body).toHaveProperty(
          "message",
          "Invalid email/password"
        );
      });
  });

  test("Login without email input", () => {
    return request(app)
      .post("/login")
      .send({
        password: "asd123",
      })
      .then((response) => {
        // console.log(response);
        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty("message", "Email is required");
      });
  });

  test("Login without password input", () => {
    return request(app)
      .post("/login")
      .send({
        email: "kurirUcok@mail.com",
      })
      .then((response) => {
        // console.log(response);
        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty("message", "Password is required");
      });
  });
});

describe("Courier fetch list transaction", () => {
  test("Courier fetching list transaction based on status done", () => {
    return request(app)
      .get("/transaction/listTransactionCourier")
      .set("access_token", accessToken3)
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect.arrayContaining(response.body);
        expect(response.body.length).toEqual(1);
      });
  });

  test("Courier fetching list transaction without access token is wrong based on status done", () => {
    return request(app)
      .get("/transaction/listTransactionCourier")
      .set("access_token", accessToken2)
      .then((response) => {
        expect(response.statusCode).toBe(401);
        expect(response.body).toHaveProperty("message", "Unauthorized");
      });
  });
});

describe("Courier change status transaction", () => {
  test("Change Status Transaction from done to delivery", () => {
    return request(app)
      .patch("/transaction/delivery/1")
      .set("access_token", accessToken3)
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty(
          "message",
          "Transaction is Delivery"
        );
        expect(response.body).toHaveProperty("CourierName", expect.any(String));
      });
  });

  test("Change Status Transaction from delivery to delivered", () => {
    return request(app)
    .patch("/transaction/delivered/2")
    .set("access_token", accessToken3)
    .then((response) => {
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty(
        "message",
        "Transaction is Delivered"
      );
      // expect(response.body).toHaveProperty("CourierName", expect.any(String));
      });
  });
});

describe("Courier fetching list transaction", () => {
  test("Fetching transaction with status done, delivery, delivered", () => {
    return request(app)
      .get("/transaction/listTransactionCourier")
      .set("access_token", accessToken3)
      .then((response) => {
        expect(response.statusCode).toBe(200);
      });
  });
});
