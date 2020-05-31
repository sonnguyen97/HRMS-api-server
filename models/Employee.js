const Sequelize = require("sequelize");
const db = require("../config/db-connection");
const EmployeeOperatorStatus = require("./EmployeeOperatorStatus");
const Role = require("./Role");

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
        personal_mail: {
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
//role
Employee.belongsTo(Role, {
    foreignKey: "status_id",
    sourceKey: "id"
});
Role.hasMany(Employee, {
    foreignKey: "status_id",
    sourceKey: "id"
});

module.exports = Employee;
