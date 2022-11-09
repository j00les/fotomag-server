const { sequelize, ATK } = require('../models')

class Controller {
    static async getNearestShop(req, res, next) {
        try {
            const  distance = 1000
            const {long, lat} = req.body
            // const {long, lat} = req.query
            // console.log(long, '????????')
            // console.log(lat, '<><><><>')

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
            next(error)
        }
    }
}


module.exports = Controller