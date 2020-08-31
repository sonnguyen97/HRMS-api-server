const Sequelize = require("sequelize");
const db = require("../config/db-connection");
const Employee = require("./Employee");
const Team = require("./Team");

const Team_Employee = db.define(
    "team_employee",
    {
        employee_id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        team_id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        modified_date: {
            type: Sequelize.TIME
        }
    },
    {
        timestamps: false,
        freezeTableName: true
    }
);

Team_Employee.belongsTo(Employee, {
    as: 'employee',
    foreignKey: "employee_id",
    sourceKey: "id"
});
Employee.hasMany(Team_Employee, {
    as: 'teams',
    foreignKey: "employee_id",
    sourceKey: "id"
});

Team_Employee.belongsTo(Team, {
    as: 'members',
    foreignKey: "team_id",
    sourceKey: "id"
});
Team.hasMany(Team_Employee, {
    as: 'members',
    foreignKey: "team_id",
    sourceKey: "id"
});

module.exports = Team_Employee;