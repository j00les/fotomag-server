"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class BalanceMutation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      BalanceMutation.belongsTo(models.User, {
        foreignKey: "UserId"
      })
      BalanceMutation.belongsTo(models.Transaction, {
        foreignKey: "TransactionId"
      })
    }
  }
  BalanceMutation.init(
    {
      nominal: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
          notEmpty: {
            msg: "Nominal is required",
          },
          notNull: {
            msg: "Nominal is required",
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
      TransactionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Transaction Id is required",
          },
          notNull: {
            msg: "Transaction Id is required",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "BalanceMutation",
    }
  );
  return BalanceMutation;
};
