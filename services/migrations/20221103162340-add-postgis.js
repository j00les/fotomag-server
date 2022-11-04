"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query("CREATE EXTENSION postgis;");
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("DROP EXTENSION postgis;");
  },
};

// multi directional komunikasi
// REST API -> client -> server -> response -> client
// socket / web socket (listener)
// kurir -> bakal ngirim event namanya -> socket server -> client (listen)

// tanpa soket
// kurir tiap 10 detik bakal mengirim update lokasi (posisi kurir disimpan)
// client tiap 10 detik bakal melakukan fetching posisi kurir yang ada di server
