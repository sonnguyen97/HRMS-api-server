const Sequelize = require("sequelize");
const db = require("../config/db-connection");
const Employee = require("./Employee");
const Department = require("./Department");

const Department_Employee = db.define(
    "department_employee",
    {
        department_id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        employee_id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        }
    },
    {
        timestamps: false,
        freezeTableName: true
    }
);

Department_Employee.belongsTo(Department, {
    foreignKey: "department_id",
    sourceKey: "id"
});
Department.hasMany(Department_Employee, {
    foreignKey: "department_id",
    sourceKey: "id"
});

Department_Employee.belongsTo(Employee, {
    foreignKey: "employee_id",
    sourceKey: "id"
});
Employee.hasMany(Department_Employee, {
    foreignKey: "employee_id",
    sourceKey: "id"
});

module.exports = Department_Employee;