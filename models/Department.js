const Sequelize = require("sequelize");
const db = require("../config/db-connection");
const DepartmentOperatorStatus = require("./DepartmentOperatorStatus");

const Department = db.define(
    "Department",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        },
        created_date: {
            type: Sequelize.DATE
        },
        modified_date: {
            type: Sequelize.DATE
        },
        status_id: {
            type: Sequelize.INTEGER
        }
    },
    {
        timestamps: false,
        freezeTableName: true
    }
);


Department.belongsTo(DepartmentOperatorStatus, {
    foreignKey: "status_id",
    sourceKey: "id"
});

DepartmentOperatorStatus.hasMany(Department, {
    foreignKey: "status_id",
    sourceKey: "id"
});

module.exports = Department;