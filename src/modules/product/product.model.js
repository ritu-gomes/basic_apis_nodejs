const path = require('path');
const sequelize = require(path.join(process.cwd(), "src/config/lib/sequelize"));
const { DataTypes } = require('sequelize');

exports.Product = sequelize.define(
    'products', {
      id: { type: DataTypes.INTEGER, autoIncrement: true,
        primaryKey: true },
      proname: { type: DataTypes.STRING,
        allowNull: false
       },
      price: { type: DataTypes.INTEGER,
        allowNull: false
       },
      color: { type: DataTypes.STRING,
        allowNull: false
       }
    }
  );