const Sequelize = require("sequelize");
const db = require("../config/db-connection");

const Position = db.define(
    "gmhrs_position_view",
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



module.exports = Position;