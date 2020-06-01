const Sequelize = require("sequelize");
const db = require("../config/db-connection");

const Role = db.define(
    "role",
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

module.exports = Role;