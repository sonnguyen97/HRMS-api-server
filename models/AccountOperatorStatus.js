const Sequelize = require("sequelize");
const db = require("../config/db-connection");

const AccountOperatorStatus = db.define(
    "accountoperatorstatus",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING
        }
    },
    {
        timestamps: false,
        freezeTableName: true
    }
);

module.exports = AccountOperatorStatus;