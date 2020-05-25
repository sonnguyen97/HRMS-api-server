const Sequelize = require("sequelize");
const db = require("../config/db-connection");

const Role = db.define(
    "Role",
    {
        id: {
            type: Sequelize.STRING,
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

module.exports = Role;