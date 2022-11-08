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
let accessToken3
let signedAccessToken3

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
  let testUser3 = await User.findByPk(4)
  const payload3 = {
    id: testUser3.id
  }

  accessToken = createAccessToken(payload);
  signedAccessToken = verifyAccessToken(accessToken);
  accessToken2 = createAccessToken(payload2);
  signedAccessToken2 = verifyAccessToken(accessToken2);
  accessToken3 = createAccessToken(payload3)
  signedAccessToken3 = verifyAccessToken(accessToken3)

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
      status: "Pending",
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

  //LOCATION KURIR DIDAPAT PAS DIA LOGIN
  // test("Register courier without location", () => {
  //   return request(app)
  //   .post('/courier/register')
  //   .set("access_token", accessToken2)
  //   .send({
  //     name: 'kurirUcok',
  //     email: 'kurirUcok@mail.com',
  //     password: "asd13",
  //     AtkId: 1
  //   })
  //   .then((response) => {
  //     expect(response.statusCode).toBe(400);
  //     expect(response.body).toBeInstanceOf(Object);
  //     expect(response.body.message).toEqual(["Location is required"]);
  //   })
  // })

  //BELUM DI HANDLE DI MODEL/MIGRATION
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

  //BELUM DI HANDLE DI MODEL/MIGRATION
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

describe("Merchant fetch list transaction", () => {
  test('Merchant fetching list transaction with status: Pending, Done, Delivery, Delivered', () => {
    return request (app)
    .get('/transaction/listTransactionMerchant')
    .set("access_token", accessToken2)
    .then((response) => {
      expect(response.statusCode).toBe(200)
      expect(response.body.length).toBeGreaterThan(0)
      expect(response.body).toEqual(expect.arrayContaining([expect.any(Object)]))
      expect(response.body[0].status).toEqual(expect.any(String))
    })
  })
  test("Merchant fetching list transaction but without access token", () => {
    return request(app)
    .get('/transaction/listTransactionMerchant')
    .then((response) => {
      expect(response.statusCode).toBe(401)
      expect(response.body).toHaveProperty("message", "Invalid token")
    })
  })

  test("Merchant fetching list transaction but still data still empty", () => {
    return request (app)
    .get('/transaction/listTransactionMerchant')
    .set("access_token", accessToken3)
    .then((response) => {
      expect(response.statusCode).toBe(200)
      expect.arrayContaining(response.body)
      expect(response.body.length).toEqual(0)
    })
  })
})

describe("Merchant updating price", () => {
  test("updating all price with correct input", () => {
    return request(app)
    .patch('/merchant/1')
    .send({
      priceColor: 2001,
      priceBlack: 1001,
      priceJilid: 10001
    })
    .then((response) => {
      expect(response.statusCode).toBe(200)
      expect(response.body).toHaveProperty('message', `You're success update`)
    })
  })

  test("updating one of the price with correct input", () => {
    return request(app)
    .patch('/merchant/1')
    .send({
      priceColor: 2002,
    })
    .then((response) => {
      expect(response.statusCode).toBe(200)
      expect(response.body).toHaveProperty('message', `You're success update`)
    })
  })

  // BELOM DI HANDLE
  test("updating the price but using string as input", () => {
    return request(app)
    .patch('/merchant/1')
    .send({
      priceColor: 'OLALA',
    })
    .then((response) => {
      expect(response.statusCode).toBe(400)
      expect(response.body).toHaveProperty('message', `Price must be integer`)
    })
  })
})

describe("Merchant updating status in transaction", () => {
  test("Changes status from pending to progress", () => {
    return request(app)
    .patch('/transaction/progress/1')
    .set("access_token", accessToken2)
    .then((response) => {
      expect(response.statusCode).toBe(200)
      expect(response.body).toHaveProperty('message', 'Transaction is Progress')
    })
  })

  test("Changes status from progress to done", () => {
    return request(app)
    .patch('/transaction/done/1')
    .set("access_token", accessToken2)
    .then((response) => {
      expect(response.statusCode).toBe(200)
      expect(response.body).toHaveProperty('message', 'Transaction is Done')
    })
  })

  test("Changes status from pending to reject", () => {
    return request(app)
    .patch('/transaction/reject/1')
    .set("access_token", accessToken2)
    .then((response) => {
      expect(response.statusCode).toBe(200)
      expect(response.body).toHaveProperty('message', 'Transaction is Reject')
    })
  })

  //BELOM DI HANDLE
  test("Changes status transaction to progress but incorrect transactionId", () => {
    return request(app)
    .patch('/transaction/progress/100')
    .set("access_token", accessToken2)
    .then((response) => {
      expect(response.statusCode).toBe(401)
      expect(response.body).toHaveProperty('message', 'Data transaction not found')
    })
  })

  //BELOM DI HANDLE
  test("Changes status transaction to reject but incorrect transactionId", () => {
    return request(app)
    .patch('/transaction/reject/100')
    .set("access_token", accessToken2)
    .then((response) => {
      expect(response.statusCode).toBe(401)
      expect(response.body).toHaveProperty('message', 'Data transaction not found')
    })
  })

  //BELOM DI HANDLE
  test("Changes status transaction to done but incorrect transactionId", () => {
    return request(app)
    .patch('/transaction/done/100')
    .set("access_token", accessToken2)
    .then((response) => {
      expect(response.statusCode).toBe(401)
      expect(response.body).toHaveProperty('message', 'Data transaction not found')
    })
  })
})

describe("Merchant fetching history transaction data", () => {
  test("fetching history transaction with correct access token", () => {
    return request(app)
    .get('/transaction/historyTransactionMerchant')
    .set('access_token', accessToken2)
    .then((response) => {
      expect(response.statusCode).toBe(200)
      // expect(response.body.length).toBeGreaterThan(0)
      expect(response.body).toEqual(expect.arrayContaining([expect.any(Object)]))
      expect(response.body[0].status).toEqual(expect.any(String))
    })
  })

  test("fetching history data but data still empty", () => {
    return request(app)
    .get('/transaction/historyTransactionMerchant')
    .set("access_token", accessToken3)
    .then((response) => {
      expect(response.statusCode).toBe(200)
      expect.arrayContaining(response.body)
      expect(response.body.length).toEqual(0)
    })
  })

  test("fetching history data but without access token", () => {
    return request(app)
    .get('/transaction/historyTransactionMerchant')
    .then((response) => {
      expect(response.statusCode).toBe(401)
      expect(response.body).toHaveProperty("message", "Invalid token")
    })
  })
})
