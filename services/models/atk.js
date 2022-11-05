"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ATK extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ATK.belongsTo(models.User, {
        foreignKey: "UserId"
      })
      ATK.hasMany(models.Courier, {
        foreignKey: "AtkId"
      })
    }
  }
  ATK.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Name is required",
          },
          notNull: {
            msg: "Name is required",
          },
        },
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Address is required",
          },
          notNull: {
            msg: "Address is required",
          },
        },
      },
      priceColor: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Price Color is required",
          },
          notNull: {
            msg: "Price Color is required",
          },
        },
      },
      priceBlack: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Price Black is required",
          },
          notNull: {
            msg: "Price Black is required",
          },
        },
      },
      priceJilid: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Price Jilid is required",
          },
          notNull: {
            msg: "Price Jilid is required",
          },
        },
      },
      location: {
        type: DataTypes.GEOMETRY("POINT"),
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Location is required",
          },
          notNull: {
            msg: "Location is required",
          },
        },
      },
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "User Id is required",
          },
          notNull: {
            msg: "User Id is required",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "ATK",
    }
  );
  return ATK;
};
