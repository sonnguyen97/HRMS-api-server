const Sequelize = require("sequelize");
const db = require("../config/db-connection");
const EmployeeOperatorStatus = require("./EmployeeOperatorStatus");
const Position = require("./Position");
const Department = require("./Department");

const Employee = db.define(
    "employee",
    {
        id: {
            type: Sequelize.STRING,
            primaryKey: true
        },
        primary_email: {
            type: Sequelize.STRING
        },
        personal_email: {
            type: Sequelize.STRING
        },
        phone: {
            type: Sequelize.STRING
        },
        first_name: {
            type: Sequelize.STRING
        },
        last_name: {
            type: Sequelize.STRING
        },
        address: {
            type: Sequelize.STRING
        },
        created_date: {
            type: Sequelize.DATE
        },
        modified_date: {
            type: Sequelize.DATE
        },
        department_id:{
            type: Sequelize.INTEGER
        },
        position_id: {
            type: Sequelize.INTEGER
        },
        vacation_start_date: {
            type: Sequelize.DATE
        },
        vacation_end_date: {
            type: Sequelize.DATE
        },
        status_id:{
            type: Sequelize.INTEGER
        }
    },
    {
        timestamps: false,
        freezeTableName: true
    }

);

//status
Employee.belongsTo(EmployeeOperatorStatus, {
    foreignKey: "status_id",
    sourceKey: "id"
});
EmployeeOperatorStatus.hasMany(Employee, {
    foreignKey: "status_id",
    sourceKey: "id"
});
//Position
Employee.belongsTo(Position, {
    as:'position',
    foreignKey: "position_id",
    sourceKey: "id"
});
Position.hasMany(Employee, {
    as:'position',
    foreignKey: "position_id",
    sourceKey: "id"
});
//Department
Employee.belongsTo(Department, {
    as:'department',
    foreignKey: "department_id",
    sourceKey: "id"
});
Department.hasMany(Employee, {
    as:'department',
    foreignKey: "department_id",
    sourceKey: "id"
});

module.exports = Employee;
