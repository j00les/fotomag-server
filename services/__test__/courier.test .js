const { sequelize, User, Transaction, BalanceMutation, ATK } = require("../models");
const { queryInterface } = sequelize;
const request = require("supertest");
const app = require("../app");
const { createAccessToken, verifyAccessToken } = require("../helper/helper");

let accessToken;
let signedAccessToken

beforeAll(async () => {
  await queryInterface.bulkInsert(
    "Users",
    [
      {
        name: "ucok1",
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
        name: "ucok2",
        email: "ucok2@mail.com",
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
      name: "Toko Maju Jaya",
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
      updatedAt: new Date()
    }
  ])
  let testUser = await User.findByPk(1);
  const payload = {
    id: testUser.id,
  };
  accessToken = createAccessToken(payload);
  signedAccessToken = verifyAccessToken(accessToken)
  
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
    cascade: true
  })
});

describe("Register new customer", () => {
  test("POST new customer with correct input", () => {
    return request(app)
      .post("/customer/register")
      .send({
        name: "ucok3",
        email: "ucok3@mail.com",
        balance: 0,
        password: "asd123",
        address:
          "Jl. Sultan Iskandar Muda No.7, RT.5/RW.9, Kby. Lama Sel., Kec. Kby. Lama, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12240",
        role: "Customer",
      })
      .then((response) => {
        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty("id", expect.any(Number));
        expect(response.body).toHaveProperty("email", expect.any(String));
        // expect(response.body).toHaveProperty("role", "Customer");
      });
  });

  test("POST new customer without email", () => {
    return request(app)
      .post("/customer/register")
      .send({
        name: "baba2",
        balance: 0,
        password: "asd123",
        address:
          "Jl. Sultan Iskandar Muda No.7, RT.5/RW.9, Kby. Lama Sel., Kec. Kby. Lama, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12240",
        role: "Customer",
      })
      .then((response) => {
        expect(response.statusCode).toBe(400);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body.message).toEqual(["Email is required"]);
      });
  });

  test("POST new customer with existing email", () => {
    return request(app)
      .post("/customer/register")
      .send({
        name: "ucok2",
        email: "ucok2@mail.com",
        balance: 0,
        password: "asd123",
        address:
          "Jl. Sultan Iskandar Muda No.7, RT.5/RW.9, Kby. Lama Sel., Kec. Kby. Lama, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12240",
        role: "Customer",
      })
      .then((response) => {
        expect(response.statusCode).toBe(400);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body.message).toEqual(["Email must be Unique"]);
      });
  });

  test("POST new customer without name", () => {
    return request(app)
      .post("/customer/register")
      .send({
        email: "ucok2@mail.com",
        balance: 0,
        password: "asd123",
        address:
          "Jl. Sultan Iskandar Muda No.7, RT.5/RW.9, Kby. Lama Sel., Kec. Kby. Lama, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12240",
        role: "Customer",
      })
      .then((response) => {
        expect(response.statusCode).toBe(400);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body.message).toEqual(["Name is required"]);
      });
  });

  test("POST new customer without email format", () => {
    return request(app)
      .post("/customer/register")
      .send({
        name: "ucok2",
        email: "ucok2OLALA",
        balance: 0,
        password: "asd123",
        address:
          "Jl. Sultan Iskandar Muda No.7, RT.5/RW.9, Kby. Lama Sel., Kec. Kby. Lama, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12240",
        role: "Customer",
      })
      .then((response) => {
        expect(response.statusCode).toBe(400);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body.message).toEqual(["Format email is required"]);
      });
  });

  test("POST new customer without password", () => {
    return request(app)
      .post("/customer/register")
      .send({
        name: "ucok2",
        email: "ucok2@mail.com",
        balance: 0,
        address:
          "Jl. Sultan Iskandar Muda No.7, RT.5/RW.9, Kby. Lama Sel., Kec. Kby. Lama, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12240",
        role: "Customer",
      })
      .then((response) => {
        expect(response.statusCode).toBe(400);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body.message).toEqual(["Password is required"]);
      });
  });
});

describe("Login to app as a customer", () => {
  test("Login as customer with correct input", () => {
    return request(app)
      .post("/login")
      .send({
        email: "ucok3@mail.com",
        password: "asd123",
      })
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty(
          "access_token",
          expect.any(String)
        );
        expect(response.body).toHaveProperty("role", "Customer"); // JANGAN LUPA DITAMBAHKAN ROLE UNTUK BALIKAN KE CLIENT
      });
  });

  test("Login as customer with wrong password", () => {
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
  });

  test("Login as customer without password", () => {
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

  test("Login as customer with wrong email", () => {
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

  test("Login as customer without email", () => {
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
});

describe("Updating customer balance", () => {
  test("Top up customer's balance", () => {
    return request(app)
      .post("/balance/pay")
      .set("access_token", accessToken)
      .send({
        nominal: 100000,
      })
      .then((response) => {
        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty("token", expect.any(String));
        expect(response.body).toHaveProperty(
          "redirect_url",
          expect.any(String)
        );
      });
  });

  //BELUM DI HANDLE DI ERROR HANDLE
  test("Top up customer's balance with wrong input", () => {
    return request(app)
      .post("/balance/pay")
      .set("access_token", accessToken)
      .send({
        nominal: "INI STRING BUKAN INTEGER",
      })
      .then((response) => {
        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty("message", "Wrong nominal input");
      });
  });

  //BELUM DI HANDLE DI ERROR HANDLE
  test("Top up customer's balance but using empty string as input/nominal", () => {
    return request(app)
      .post("/balance/pay")
      .set("access_token", accessToken)
      .send({
        nominal: "",
      })
      .then((response) => {
        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty("message", "Nominal is required");
      });
  });

  //BELUM DI HANDLE DI ERROR HANDLER
  test("Top up customer's balance but without input (no nominal / nominal=undefined)", () => {
    return request(app)
      .post("/balance/pay")
      .set("access_token", accessToken)
      .send({})
      .then((response) => {
        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty("message", "Nominal is required");
      });
  });
});

describe("Customer create a new transaction", () => {
  // test("Create a new transaction with correct input", () => {
    // return request(app)
    // .post('/transaction/1')
    // .set("access_token", accessToken)
    // .attach("fileName", "__test__/dummyData/Docker.pdf")
    // .field("colorVariant", "Berwarna")
    // .field("duplicate", 4)
    // .field("isJilid", true)
    // .field("address", "Jakarta")
    // .then((response) => {
    //   expect(response.statusCode).toBe(201)
    //   expect(response.body).toHaveProperty("id", expect.any(Number))
    //   expect(response.body).toHaveProperty("fileName", expect.any(String))
    //   expect(response.body).toHaveProperty("totalPages", expect.any(Number))
    //   expect(response.body).toHaveProperty("colorVariant", expect.any(String))
    //   expect(response.body).toHaveProperty("duplicate", expect.any(Number))
    //   expect(response.body).toHaveProperty("isJilid", expect.any(String))
    //   expect(response.body).toHaveProperty("address", expect.any(String))
    //   expect(response.body).toHaveProperty("status", expect.any(String))
    //   expect(response.body).toHaveProperty("UserId", expect.any(Number))
    //   expect(response.body).toHaveProperty("totalPrice", expect.any(Number))
    //   expect(response.body).toHaveProperty("AtkId", expect.any(Number))
    //   expect(response.body.location).toBeInstanceOf(Object)
    // })
  // })

  test("Create a new order without pdf", () => {
    return request(app)
    .post('/transaction/1')
    .set("access_token", accessToken)
    .field("colorVariant", "Berwarna")
    .field("duplicate", 4)
    .field("isJilid", "YES")
    .field("address", "Jakarta")
    .then((response) => {
      expect(response.statusCode).toBe(400)
      expect(response.body).toHaveProperty("message", "Uploaded PDF is required")
    })
  })

  test("Create a new order without inputting color variant", () => {
    return request(app)
    .post('/transaction/1')
    .set("access_token", accessToken)
    .attach("fileName", "__test__/dummyData/Docker.pdf")
    .field("duplicate", 4)
    .field("isJilid", "YES")
    .field("address", "Jakarta")
    .then((response) => {
      expect(response.statusCode).toBe(400);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body.message).toEqual(["Color Variant is required"]);
    });
  })

  test("Create a new order without inputting duplicate", () => {
    return request(app)
    .post('/transaction/1')
    .set("access_token", accessToken)
    .attach("fileName", "__test__/dummyData/Docker.pdf")
    .field("colorVariant", "Berwarna")
    .field("isJilid", "YES")
    .field("address", "Jakarta")
    .then((response) => {
      expect(response.statusCode).toBe(400);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body.message).toEqual(["Duplicate is required"]);
    });
  })

  test("Create a new order without inputting isJilid", () => {
    return request(app)
    .post('/transaction/1')
    .set("access_token", accessToken)
    .attach("fileName", "__test__/dummyData/Docker.pdf")
    .field("colorVariant", "Berwarna")
    .field("duplicate", 4)
    .field("address", "Jakarta")
    .then((response) => {
      expect(response.statusCode).toBe(400);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body.message).toEqual(["Jilid is required"]);
    });
  })

  test("Create a new order without inputting address", () => {
    return request(app)
    .post('/transaction/1')
    .set("access_token", accessToken)
    .attach("fileName", "__test__/dummyData/Docker.pdf")
    .field("colorVariant", "Berwarna")
    .field("duplicate", 4)
    .field("isJilid", "YES")
    .then((response) => {
      expect(response.statusCode).toBe(400);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body.message).toEqual(["Address is required"]);
    });
  })
})