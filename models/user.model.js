const sequelize = require('./dbmodel');
const { DataTypes } = require('sequelize');
const UserType = require('./user-type.model');

const User = sequelize.define(
    'Users', {
      id: { type: DataTypes.INTEGER, autoIncrement: true,
        primaryKey: true },
      first_name: { type: DataTypes.STRING(255)
        },
      last_name: { type: DataTypes.STRING(255)
           },
      username: { type: DataTypes.STRING,
        allowNull: false
       },
      email: { type: DataTypes.STRING,
        allowNull: false
       },
      password: { type: DataTypes.STRING,
        allowNull: false
       },
      user_type_id: { type: DataTypes.INTEGER,
        allowNull: false
       },
       is_active: { type: DataTypes.ENUM,
        values: [0,1]
       }
    }
  );

  UserType.hasMany( User, {as: "users", foreignKey: "user_type_id"});
  User.belongsTo(UserType, {as: "user_types", foreignKey: "user_type_id"});

  module.exports = User;