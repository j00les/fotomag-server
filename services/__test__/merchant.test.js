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
const { createAccessToken, verifyAccessToken } = require("../helper/helper");

let accessToken;
let signedAccessToken;
let accessToken2;
let signedAccessToken2;

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

  await queryInterface.bulkInsert("Couriers", [
    {
      name: "kurirUcok", //ID : 1
      email: "kurirUcok@mail.com",
      password: "asd123",
      location: sequelize.fn(
        "ST_GeomFromText",
        "POINT(37.4220936 -122.083922)"
      ),
      AtkId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);

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

describe("Register new merchant", () => {
  test("Register new merchant with correct input", () => {
    return request(app)
      .post("/merchant/register")
      .send({
        name: "ucok3",
        email: "ucok3@mail.com",
        password: "asd123",
        address:
          "Jl. Sultan Iskandar Muda No.7, RT.5/RW.9, Kby. Lama Sel., Kec. Kby. Lama, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12240",
        role: "Merchant",
        atkAddress: "Pekanbaru",
        atkName: "Toko Sumber Makmur",
        priceColor: 2000,
        priceBlack: 1000,
        priceJilid: 10000,
      })
      .then((response) => {
        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty(
          "merchantName",
          expect.any(String)
        );
        expect(response.body).toHaveProperty("shopName", expect.any(String));
        // expect(response.body).toHaveProperty("role", "Customer");
      });
  });

  test("Register new merchant without email", () => {
    return request(app)
      .post("/merchant/register")
      .send({
        name: "ucok3",
        password: "asd123",
        address:
          "Jl. Sultan Iskandar Muda No.7, RT.5/RW.9, Kby. Lama Sel., Kec. Kby. Lama, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12240",
        role: "Merchant",
        atkAddress: "Pekanbaru",
        atkName: "Toko Sumber Makmur",
        priceColor: 2000,
        priceBlack: 1000,
        priceJilid: 10000,
      })
      .then((response) => {
        expect(response.statusCode).toBe(400);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body.message).toEqual(["Email is required"]);
      });
  });

  test("Register new merchant with existing email", () => {
    return request(app)
    .post("/merchant/register")
      .send({
        name: "ucok3",
        email: "ucok3@mail.com",
        password: "asd123",
        address:
          "Jl. Sultan Iskandar Muda No.7, RT.5/RW.9, Kby. Lama Sel., Kec. Kby. Lama, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12240",
        role: "Merchant",
        atkAddress: "Pekanbaru",
        atkName: "Toko Sumber Makmur",
        priceColor: 2000,
        priceBlack: 1000,
        priceJilid: 10000,
      })
      .then((response) => {
        expect(response.statusCode).toBe(400);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body.message).toEqual(["Email must be Unique"]);
      });
  })

  test("Register new merchant without name", () => {
    return request(app)
    .post("/merchant/register")
      .send({
        email: "ucok3@mail.com",
        password: "asd123",
        address:
          "Jl. Sultan Iskandar Muda No.7, RT.5/RW.9, Kby. Lama Sel., Kec. Kby. Lama, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12240",
        role: "Merchant",
        atkAddress: "Pekanbaru",
        atkName: "Toko Sumber Makmur",
        priceColor: 2000,
        priceBlack: 1000,
        priceJilid: 10000,
      })
      .then((response) => {
        expect(response.statusCode).toBe(400);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body.message).toEqual(["Name is required"]);
      });
  })

  test("Register new merchant without email format", () => {
    return request(app)
    .post("/merchant/register")
      .send({
        name: "ucok3",
        email: "ucok3OLALA",
        password: "asd123",
        address:
          "Jl. Sultan Iskandar Muda No.7, RT.5/RW.9, Kby. Lama Sel., Kec. Kby. Lama, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12240",
        role: "Merchant",
        atkAddress: "Pekanbaru",
        atkName: "Toko Sumber Makmur",
        priceColor: 2000,
        priceBlack: 1000,
        priceJilid: 10000,
      })
      .then((response) => {
        expect(response.statusCode).toBe(400);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body.message).toEqual(["Format email is required"]);
      });
  })

  test("Register new merchant without password", () => {
    return request(app)
    .post("/merchant/register")
      .send({
        name: "ucok3",
        email: "ucok3@mail.com",
        address:
          "Jl. Sultan Iskandar Muda No.7, RT.5/RW.9, Kby. Lama Sel., Kec. Kby. Lama, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12240",
        role: "Merchant",
        atkAddress: "Pekanbaru",
        atkName: "Toko Sumber Makmur",
        priceColor: 2000,
        priceBlack: 1000,
        priceJilid: 10000,
      })
      .then((response) => {
        expect(response.statusCode).toBe(400);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body.message).toEqual(["Password is required"]);
      });
  })
});

describe("Login to app as a merchant", () => {
  test("Login as merchant with correct input", () => {
    return request(app)
    .post('/login')
    .send({
      email: 'ucok3@mail.com',
      password: 'asd123'
    })
    .then((response) => {
      expect(response.statusCode).toBe(200)
      expect(response.body).toHaveProperty(
        "access_token",
        expect.any(String)
      );
      expect(response.body).toHaveProperty("role", "Merchant")
    })
  })

  test("Login as merchant with wrong password", () => {
    return request(app)
      .post("/login")
      .send({
        email: "ucok3@mail.com",
        password: "asd1234",
      })
      .then((response) => {
        expect(response.statusCode).toBe(401);
        expect(response.body).toHaveProperty(
          "message",
          "Invalid email/password"
        );
      });
  })

  test("Login as merchant without password", () => {
    return request(app)
      .post("/login")
      .send({
        email: "ucok3@mail.com",
      })
      .then((response) => {
        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty("message", "Password is required");
      });
  });

  test("Login as merchant with wrong email", () => {
    return request(app)
      .post("/login")
      .send({
        email: "ucokOLALA@mail.com",
        password: "asd123",
      })
      .then((response) => {
        expect(response.statusCode).toBe(401);
        expect(response.body).toHaveProperty(
          "message",
          "Invalid email/password"
        );
      });
  });

  test("Login as merchant without email", () => {
    return request(app)
      .post("/login")
      .send({
        password: "asd123",
      })
      .then((response) => {
        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty("message", "Email is required");
      });
  });
})

describe("Merchant register a new courier", () => {
  test("Register courier with correct input", () => {
    return request(app)
    .post('/courier/register')
    .set("access_token", accessToken2)
    .send({
      name: 'kurirUcok',
      email: 'kurirUcok@mail.com',
      password: "asd13",
      location: sequelize.fn(
        "ST_GeomFromText",
        "POINT(37.4220936 -122.083922)"
      ),
      AtkId: 1
    })
    .then((response) => {
      expect(response.statusCode).toBe(201)
      // expect(response)
    })
  })

  test("Register courier without name", () => {
    return request(app)
    .post('/courier/register')
    .set("access_token", accessToken2)
    .send({
      email: 'kurirUcok@mail.com',
      password: "asd13",
      location: sequelize.fn(
        "ST_GeomFromText",
        "POINT(37.4220936 -122.083922)"
      ),
      AtkId: 1
    })
    .then((response) => {
      expect(response.statusCode).toBe(400);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body.message).toEqual(["Name is required"]);
    });
  })

  test("Register courier without email", () => {
    return request(app)
    .post('/courier/register')
    .set("access_token", accessToken2)
    .send({
      name: 'kurirUcok',
      password: "asd13",
      location: sequelize.fn(
        "ST_GeomFromText",
        "POINT(37.4220936 -122.083922)"
      ),
      AtkId: 1
    })
    .then((response) => {
      expect(response.statusCode).toBe(400);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body.message).toEqual(["Email is required"]);
    });
  })

  test("Register courier without password", () => {
    return request(app)
    .post('/courier/register')
    .set("access_token", accessToken2)
    .send({
      name: 'kurirUcok',
      email: 'kurirUcok@mail.com',
      location: sequelize.fn(
        "ST_GeomFromText",
        "POINT(37.4220936 -122.083922)"
      ),
      AtkId: 1
    })
    .then((response) => {
      expect(response.statusCode).toBe(400);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body.message).toEqual(["Password is required"]);
    });
  })

  test("Register courier without location", () => {
    return request(app)
    .post('/courier/register')
    .set("access_token", accessToken2)
    .send({
      name: 'kurirUcok',
      email: 'kurirUcok@mail.com',
      password: "asd13",
      AtkId: 1
    })
    .then((response) => {
      expect(response.statusCode).toBe(400);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body.message).toEqual(["Location is required"]);
    })
  })

  test("Register courier with existing email", () => {
    return request(app)
    .post('/courier/register')
    .set("access_token", accessToken2)
    .send({
      name: 'kurirUcok',
      email: 'kurirUcok@mail.com',
      password: "asd13",
      location: sequelize.fn(
        "ST_GeomFromText",
        "POINT(37.4220936 -122.083922)"
      ),
      AtkId: 1
    })
    .then((response) => {
      expect(response.statusCode).toBe(400);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body.message).toEqual(["Email must be Unique"]);
    });
  })

  test("Register courier without email format", () => {
    return request(app)
    .post('/courier/register')
    .set("access_token", accessToken2)
    .send({
      name: 'kurirUcok',
      email: 'kurirUcok@mail.com',
      password: "asd13",
      AtkId: 1
    })
    .then((response) => {
      expect(response.statusCode).toBe(400);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body.message).toEqual(["Format email is required"]);
    });
  })
})