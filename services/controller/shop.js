const { sequelize, ATK } = require("../models");

class Controller {
  static async getNearestShop(req, res, next) {
    try {
      const distance = 1000;
      const { longitude, latitude } = req.body;
      if (!longitude || !latitude) {
        return res.status(400).json({ message: "Coordinate is required" });
      }

      const result = await sequelize.query(
        `select
                id,
                name,
                location
              from
                "ATKs"
              where
                ST_DWithin(location,
                ST_MakePoint(:latitude,
                :longitude),
                :distance,
              true) = true;`,
        {
          replacements: {
            distance: +distance,
            longitude: parseFloat(longitude),
            latitude: parseFloat(latitude),
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
