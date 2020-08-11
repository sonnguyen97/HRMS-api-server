const Sequelize = require("sequelize");
const db = require("../config/db-connection");
const Employee = require("./Employee");

const Vacation = db.define(
    "vacation_date",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        created_date: {
            type: Sequelize.DATE
        },
        employee_id: {
            type: Sequelize.INTEGER
        },
        start_date: {
            type: Sequelize.DATE
        },
        end_date: {
            type:Sequelize.DATE
        }
    },
    {
        timestamps: false,
        freezeTableName: true
    }
);


Employee.belongsTo(Vacation, {
    foreignKey: "employee_id",
    sourceKey: "id"
});

Vacation.hasMany(Employee, {
    foreignKey: "employee_id",
    sourceKey: "id"
});

module.exports = Vacation;