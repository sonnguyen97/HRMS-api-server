const Sequelize = require("sequelize");
const db = require("../config/db-connection");

const AccountOperatorStatus = db.define(
    "AccountOperatorStatus",
    {
        id: {
            type: Sequelize.STRING,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING
        }
    }
);

module.exports = AccountOperatorStatus;