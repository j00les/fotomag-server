const { sequelize, User } = require("../models");
const { queryInterface } = sequelize;
const request = require("supertest");
const app = require("../app");

beforeAll(async () => {
  await queryInterface.bulkInsert(
    "Users",
    [
      {
        name: "ucok1",
        email: "ucok1@mail.com",
        balance: 0,
        password: "asd123",
        address:
          "Jl. Sultan Iskandar Muda No.7, RT.5/RW.9, Kby. Lama Sel., Kec. Kby. Lama, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12240",
        role: "Customer",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "baba1",
        email: "baba1@mail.com",
        balance: 0,
        password: "asd123",
        address:
          "Jl. Sultan Iskandar Muda No.7, RT.5/RW.9, Kby. Lama Sel., Kec. Kby. Lama, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12240",
        role: "Seller",
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
});

describe("Hitting endpoint /users", () => {
  test("POST new customer with correct input", () => {
    return request(app)
      .post("/users")
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
        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty("id", expect.any(Number));
        expect(response.body).toHaveProperty("role", "Customer");
      });
  });
  test("POST new seller with correct input", () => {
    return request(app)
      .post("/users")
      .send({
        name: "baba2",
        email: "baba2@mail.com",
        balance: 0,
        password: "asd123",
        address:
          "Jl. Sultan Iskandar Muda No.7, RT.5/RW.9, Kby. Lama Sel., Kec. Kby. Lama, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12240",
        role: "Seller",
      })
      .then((response) => {
        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty("id", expect.any(Number));
        expect(response.body).toHaveProperty("role", "Seller");
      });
  });
  test("POST new user without email", () => {
    return request(app)
      .post("/users")
      .send({
        name: "baba2",
        balance: 0,
        password: "asd123",
        address:
          "Jl. Sultan Iskandar Muda No.7, RT.5/RW.9, Kby. Lama Sel., Kec. Kby. Lama, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12240",
        role: "Seller",
      })
      .then((response) => {
        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty("msg", "Email is required");
      });
  });
  test("POST new user with existing email", () => {
    return request(app)
      .post("/users")
      .send({
        name: "baba1",
        email: "baba1@mail.com",
        balance: 0,
        password: "asd123",
        address:
          "Jl. Sultan Iskandar Muda No.7, RT.5/RW.9, Kby. Lama Sel., Kec. Kby. Lama, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12240",
        role: "Seller",
      })
      .then((response) => {
        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty("msg", "Your email already used");
      });
  });
  test("POST new user without password", () => {
    return request(app)
      .post("/users")
      .send({
        name: "baba2",
        email: "baba2@mail.com",
        balance: 0,
        address:
          "Jl. Sultan Iskandar Muda No.7, RT.5/RW.9, Kby. Lama Sel., Kec. Kby. Lama, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12240",
        role: "Seller",
      })
      .then((response) => {
        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty("msg", "Password is required");
      });
  });
  test("POST new user with wrong format email", () => {
    return request(app)
      .post("/users")
      .send({
        name: "baba2",
        email: "baba2OLALA",
        balance: 0,
        password: "asd123",
        address:
          "Jl. Sultan Iskandar Muda No.7, RT.5/RW.9, Kby. Lama Sel., Kec. Kby. Lama, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12240",
        role: "Seller",
      })
      .then((response) => {
        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty("msg", "Format email is required");
      });
  });
});

describe("Hitting endpoint /users/:id", () => {
  test("GET users detail", () => {
    return request(app)
      .get("/users/:1")
      .set("access_token", "xxxx")
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty("id", expect.any(Number));
      });
  });
  test("PATCH user balance", () => {
    return request(app)
      .patch("/users/:1")
      .set("access_token", "xxxxxx")
      .send({
        balance: 10000
      })
      .then((response) => {
        expect(response.statusCode).toBe(201);
        expect(response.body.balance).toBeGreaterThan(0);
      });
  });
});

describe("Hitting endpoint /users/login", () => {
  test("Login with correct input", () => {
    return request(app)
      .post("/users/login")
      .send({
        email: "ucok1@mail.com",
        password: "asd123",
      })
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty(
          "access_token",
          expect.any(String)
        );
        expect(response.body).toHaveProperty("id", expect.any(Number));
        expect(response.body).toHaveProperty("role", "Customer");
        expect(response.body).toHaveProperty("name", "ucok1");
      });
  });
  test("Login with wrong password", () => {
    return request(app)
      .post("/users/login")
      .send({
        email: "ucok1@mail.com",
        password: "asdasdasd123123123",
      })
      .then((response) => {
        expect(response.statusCode).toBe(401);
        expect(response.body).toHaveProperty("msg", "Email/Password Incorrect");
      });
  });
  test("Login with wrong email", () => {
    return request(app)
      .post("/users/login")
      .send({
        email: "ucok12345@mail.com",
        password: "asd123",
      })
      .then((response) => {
        expect(response.statusCode).toBe(401);
        expect(response.body).toHaveProperty("msg", "Email/Password Incorrect");
      });
  });
});
