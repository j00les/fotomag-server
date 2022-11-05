const { sequelize, User, ATK } = require("../models");
const { queryInterface } = sequelize;
const request = require("supertest");
const app = require("../app");

beforeAll(async () => {
  await queryInterface.bulkInsert(
    "Users",
    [
      {
        name: "baba1",
        email: "baba1@mail.com",
        // balance: 0,
        password: "asd123",
        address:
          "Jl. Sultan Iskandar Muda No.7, RT.5/RW.9, Kby. Lama Sel., Kec. Kby. Lama, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12240",
        role: "Merchant",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    null
  );
  await queryInterface.bulkInsert(
    "ATKs",
    [
      {
        name: "Printing Doa Ibu",
        address:
          "Jl. Sultan Iskandar Muda No.7, RT.5/RW.9, Kby. Lama Sel., Kec. Kby. Lama, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12240",
        priceColor: 2000,
        priceBlack: 1000,
        priceJilid: 10000,
        location: sequelize.fn(
          "ST_GeomFromText",
          "POINT(37.4220936 -122.083922)"
        ),
        UserId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    null
  );
});

afterAll(async () => {
  await queryInterface.bulkDelete("Users", null, {
    truncate: true,
    restartIdentity: true,
    cascade: true,
  });
  await queryInterface.bulkDelete("ATKs", null, {
    truncate: true,
    restartIdentity: true,
    cascade: true,
  });
});

describe("Register new merchant", () => {
  test("POST new merchant with correct input", () => {
    return request(app)
      .post("/servicer/register")
      .send({
        name: "baba2",
        email: "baba2@mail.com",
        balance: 0,
        password: "asd123",
        address:
          "Jl. Sultan Iskandar Muda No.7, RT.5/RW.9, Kby. Lama Sel., Kec. Kby. Lama, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12240",
        role: "Merchant",
        atkName: "Printing Doa Ibu",
        atkAddress:
          "Jl. Sultan Iskandar Muda No.7, RT.5/RW.9, Kby. Lama Sel., Kec. Kby. Lama, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12240",
        priceColor: 1000,
        priceBlack: 100,
        priceJilid: 5000,
      })
      .then((response) => {
        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty("id", expect.any(Number));
        expect(response.body).toHaveProperty("email", expect.any(String));
        // expect(response.body).toHaveProperty("role", "Seller");
      });
  });

  test("POST new merchant without email", () => {
    return request(app)
      .post("/servicer/register")
      .send({
        name: "baba2",
        balance: 0,
        password: "asd123",
        address:
          "Jl. Sultan Iskandar Muda No.7, RT.5/RW.9, Kby. Lama Sel., Kec. Kby. Lama, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12240",
        role: "Merchant",
        atkName: "Printing Doa Ibu",
        atkAddress:
          "Jl. Sultan Iskandar Muda No.7, RT.5/RW.9, Kby. Lama Sel., Kec. Kby. Lama, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12240",
        priceColor: 1000,
        priceBlack: 100,
        priceJilid: 5000,
      })
      .then((response) => {
        expect(response.statusCode).toBe(400);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body.message).toEqual(["Email is required"]);
        // expect(response.body).toHaveProperty("role", "Seller");
      });
  });
  // test("POST new user with existing email", () => {
  //   return request(app)
  //     .post("/users")
  //     .send({
  //       name: "baba1",
  //       email: "baba1@mail.com",
  //       balance: 0,
  //       password: "asd123",
  //       address:
  //         "Jl. Sultan Iskandar Muda No.7, RT.5/RW.9, Kby. Lama Sel., Kec. Kby. Lama, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12240",
  //       role: "Seller",
  //     })
  //     .then((response) => {
  //       expect(response.statusCode).toBe(400);
  //       expect(response.body).toHaveProperty("msg", "Your email already used");
  //     });
  // });
  // test("POST new user without password", () => {
  //   return request(app)
  //     .post("/users")
  //     .send({
  //       name: "baba2",
  //       email: "baba2@mail.com",
  //       balance: 0,
  //       address:
  //         "Jl. Sultan Iskandar Muda No.7, RT.5/RW.9, Kby. Lama Sel., Kec. Kby. Lama, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12240",
  //       role: "Seller",
  //     })
  //     .then((response) => {
  //       expect(response.statusCode).toBe(400);
  //       expect(response.body).toHaveProperty("msg", "Password is required");
  //     });
  // });
  // test("POST new user with wrong format email", () => {
  //   return request(app)
  //     .post("/users")
  //     .send({
  //       name: "baba2",
  //       email: "baba2OLALA",
  //       balance: 0,
  //       password: "asd123",
  //       address:
  //         "Jl. Sultan Iskandar Muda No.7, RT.5/RW.9, Kby. Lama Sel., Kec. Kby. Lama, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12240",
  //       role: "Seller",
  //     })
  //     .then((response) => {
  //       expect(response.statusCode).toBe(400);
  //       expect(response.body).toHaveProperty("msg", "Format email is required");
  //     });
  // });
});

// describe("Hitting endpoint /users/:id", () => {
//   test("GET users detail", () => {
//     return request(app)
//       .get("/users/:1")
//       .set("access_token", "xxxx")
//       .then((response) => {
//         expect(response.statusCode).toBe(200);
//         expect(response.body).toHaveProperty("id", expect.any(Number));
//       });
//   });
//   test("PATCH user balance", () => {
//     return request(app)
//       .patch("/users/:1")
//       .set("access_token", "xxxxxx")
//       .send({
//         balance: 10000
//       })
//       .then((response) => {
//         expect(response.statusCode).toBe(201);
//         expect(response.body.balance).toBeGreaterThan(0);
//       });
//   });
// });

// describe("Hitting endpoint /users/login", () => {
//   test("Login with correct input", () => {
//     return request(app)
//       .post("/users/login")
//       .send({
//         email: "ucok1@mail.com",
//         password: "asd123",
//       })
//       .then((response) => {
//         expect(response.statusCode).toBe(200);
//         expect(response.body).toHaveProperty(
//           "access_token",
//           expect.any(String)
//         );
//         expect(response.body).toHaveProperty("id", expect.any(Number));
//         expect(response.body).toHaveProperty("role", "Customer");
//         expect(response.body).toHaveProperty("name", "ucok1");
//       });
//   });
//   test("Login with wrong password", () => {
//     return request(app)
//       .post("/users/login")
//       .send({
//         email: "ucok1@mail.com",
//         password: "asdasdasd123123123",
//       })
//       .then((response) => {
//         expect(response.statusCode).toBe(401);
//         expect(response.body).toHaveProperty("msg", "Email/Password Incorrect");
//       });
//   });
//   test("Login with wrong email", () => {
//     return request(app)
//       .post("/users/login")
//       .send({
//         email: "ucok12345@mail.com",
//         password: "asd123",
//       })
//       .then((response) => {
//         expect(response.statusCode).toBe(401);
//         expect(response.body).toHaveProperty("msg", "Email/Password Incorrect");
//       });
//   });
// });
