const { DataTypes, Sequelize } = require('sequelize');

const sequelize = new Sequelize('user_test_db', 'root', '', {
    logging: console.log,
    dialect: "mysql",
    define: {
      timestamps: false
    },
    sync: true
  });

  exports.User = sequelize.define(
    'Users', {
      id: { type: DataTypes.INTEGER, autoIncrement: true,
        primaryKey: true },
      username: { type: DataTypes.STRING,
        allowNull: false
       },
      email: { type: DataTypes.STRING,
        allowNull: false
       },
      password: { type: DataTypes.STRING,
        allowNull: false
       }
    }
  );