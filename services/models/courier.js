"use strict";
const { Model } = require("sequelize");
const { hashingPassword } = require("../helper/helper");
module.exports = (sequelize, DataTypes) => {
  class Courier extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Courier.belongsTo(models.ATK, {
        foreignKey: "AtkId",
      });
      Courier.hasMany(models.Transaction, {
        foreignKey: "CourierId",
      });
    }
  }
  Courier.init(
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
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: "Email must be Unique",
        },
        validate: {
          notEmpty: {
            msg: "Email is required",
          },
          notNull: {
            msg: "Email is required",
          },
          isEmail: {
            msg: "Format email is required",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Password is required",
          },
          notNull: {
            msg: "Password is required",
          },
        },
      },
      location: DataTypes.GEOMETRY("POINT"),
      AtkId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "ATK ID is required",
          },
          notNull: {
            msg: "ATK ID is required",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Courier",
    }
  );
  Courier.beforeCreate((data) => {
    data.password = hashingPassword(data.password);
  });
  return Courier;
};
