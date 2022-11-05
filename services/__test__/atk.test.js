const { sequelize, Atk } = require("../models");
const { queryInterface } = sequelize;
const request = require("supertest");
const app = require("../app");

beforeAll(async () => {
    await queryInterface.bulkInsert('Atk', [
        {
            name: 'Fotokopi Doa Ibu',
            address:  "Jl. Sultan Iskandar Muda No.7, RT.5/RW.9, Kby. Lama Sel., Kec. Kby. Lama, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12240",
            priceColor: 2000,
            priceJilid: 10000,
            UserId: 2,
            location: '-6.26080040849024, 106.78153713968123',
            createdAt: new Date(),
            updatedAt: new Date()
        }
    ])
})

afterAll(async () => {
    await queryInterface.bulkDelete('Atk', null, {
        truncate: true,
        restartIdentity: true,
        cascade: true
    })
})

