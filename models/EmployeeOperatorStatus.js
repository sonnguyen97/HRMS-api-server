const Sequelize = require("sequelize");
const db = require("../config/db-connection");

const EmployeeOperatorStatus = db.define(
    "gmhrs_employeeoperastatus_view",
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

module.exports = EmployeeOperatorStatus;