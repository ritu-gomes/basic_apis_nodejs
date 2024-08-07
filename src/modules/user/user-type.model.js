const path = require('path');
const sequelize = require(path.join(process.cwd(), "src/config/lib/sequelize"));
const { DataTypes } = require('sequelize');

const UserType = sequelize.define(
    'user_types', {
      id: { type: DataTypes.INTEGER, autoIncrement: true,
        primaryKey: true },
      name: { type: DataTypes.STRING,
        allowNull: false
       },
      is_active: { type: DataTypes.ENUM,
        values: [0,1]
       }
    }
  );

  module.exports = UserType;