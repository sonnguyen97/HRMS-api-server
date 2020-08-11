const Sequelize = require("sequelize");
const db = require("../config/db-connection");
const Employee = require("./Employee");

const Vacation_Employee = db.define(
    "vacation_date",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        start_date: {
            type: Sequelize.DATE
        },
        end_date: {
            type: Sequelize.DATE
        },
        created_date: {
            type: Sequelize.DATE
        },
        employee_id: {
            type: Sequelize.INTEGER,
        },
    },
    {
        timestamps: false,
        freezeTableName: true
    }
);

Vacation_Employee.belongsTo(Employee, {
    foreignKey: "employee_id",
    sourceKey: "id"
});
Employee.hasMany(Vacation_Employee, {
    foreignKey: "employee_id",
    sourceKey: "id"
});


module.exports = Vacation_Employee;