"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Transaction.belongsTo(models.User, {
        foreignKey: "UserId"
      })
      Transaction.hasOne(models.BalanceMutation, {
        foreignKey: "TransactionId"
      })
      Transaction.belongsTo(models.Courier, {
        foreignKey: "CourierId"
      })
    }
  }
  Transaction.init(
    {
      fileName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "File Name is required",
          },
          notNull: {
            msg: "File Name is required",
          },
        },
      },
      totalPages: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Total Pages is required",
          },
          notNull: {
            msg: "Total Pages is required",
          },
        },
      },
      colorVariant: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Color Variant is required",
          },
          notNull: {
            msg: "Color Variant is required",
          },
        },
      },
      duplicate: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Duplicate is required",
          },
          notNull: {
            msg: "Duplicate is required",
          },
        },
      },
      totalPrice: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Total Price is required",
          },
          notNull: {
            msg: "Total Price is required",
          },
        },
      },
      isJilid: DataTypes.BOOLEAN,
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
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Status is required",
          },
          notNull: {
            msg: "Status is required",
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
      CourierId: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "Transaction",
    }
  );

  return Transaction;
};
