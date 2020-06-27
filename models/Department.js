const Sequelize = require("sequelize");
const db = require("../config/db-connection");
const DepartmentOperatorStatus = require("./DepartmentOperatorStatus");

const Department = db.define(
    "department",
    {
        id: {
            type: Sequelize.STRING,
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
        orgunits_path: {
            type:Sequelize.STRING
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