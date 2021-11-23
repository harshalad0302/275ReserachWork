const { sequelize, DataTypes } = require('../db/connection');

// CREATE TABLE `users` (
//   `userID` int NOT NULL,
//   `password` varchar(45) NOT NULL,
//   `firstName` varchar(45) DEFAULT NULL,
//   `lastName` varchar(45) DEFAULT NULL,
//   `emailID` varchar(45) NOT NULL,
//   `phoneNumber` varchar(45) DEFAULT NULL,
//   `address` varchar(45) DEFAULT NULL,
//   `type` varchar(45) DEFAULT NULL,
//   `miles` int DEFAULT NULL,
//   PRIMARY KEY (`userID`)
// ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


const users = sequelize.define('users', {
    // Model attributes are defined here
    userID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    password: {
        type: DataTypes.STRING
        // allowNull defaults to true
    },
     firstName: {
        type: DataTypes.STRING
        // allowNull defaults to true
    },
      lastName: {
        type: DataTypes.STRING
        // allowNull defaults to true
    },
    emailID: {
        type: DataTypes.STRING
        // allowNull defaults to true
    },
    phoneNumber: {
        type: DataTypes.STRING
        // allowNull defaults to true
    },
    address: {
        type: DataTypes.STRING
        // allowNull defaults to true
    },
    type: {
        type: DataTypes.STRING
        // allowNull defaults to true
    },
    miles: {
        type: DataTypes.INTEGER
        // allowNull defaults to true
    }

},

    {
        tableName : 'users',
        timestamps : false
    }


);

module.exports = users;