const Sequelize = require("sequelize");
const db = require("../config/db-connection");

const Account = db.define(
  "Account",
  {
    id: {
      type: Sequelize.STRING,
      primaryKey: true
    },
    email: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    created_date: {
      type: Sequelize.DATE
      
    },
    modified_date: {
      type: Sequelize.DATE
    }

  },
  {
    timestamps: false,
    freezeTableName: true
  }
);

module.exports = Account;
