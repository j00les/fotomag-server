const { sequelize, ATK } = require("../models");

class Controller {
  static async getNearestShop(req, res, next) {
    try {
      const distance = 1000;
      const { long, lat } = req.body;
      if(!long || !lat) {
        return res.status(400).json({message: "Coordinate is required"})
      }
      // const { location } = req.body;
      // const { latitude, longitude } = JSON.parse(location);

      const result = await sequelize.query(
        `select
                id,
                name,
                location
              from
                "ATKs"
              where
                ST_DWithin(location,
                ST_MakePoint(:lat,
                :long),
                :distance,
              true) = true;`,
        {
          replacements: {
            distance: +distance,
            long: parseFloat(long),
            lat: parseFloat(lat),
          },
          logging: console.log,
          plain: false,
          raw: false,
          type: sequelize.QueryTypes.SELECT,
        }
      );
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
