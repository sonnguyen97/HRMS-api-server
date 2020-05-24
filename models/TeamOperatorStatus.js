const Sequelize = require("sequelize");
const db = require("../config/db-connection");

const TeamOperatorStatus = db.define(
    "TeamOperatorStatus",
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

module.exports = TeamOperatorStatus;