const Sequelize = require("sequelize");
const db = require("../config/db-connection");
const TeamOperatorStatus = require("./TeamOperatorStatus");

const Team = db.define(
    "team",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING,
        },
        created_date: {
            type: Sequelize.DATE
        },
        modified_date: {
            type: Sequelize.DATE
        },
        description: {
            type: Sequelize.STRING
        }
    },
    {
        timestamps: false,
        freezeTableName: true
    }
);

Team.belongsTo(TeamOperatorStatus, {
    foreignKey: "status_id",
    sourceKey: "id"
});

TeamOperatorStatus.hasMany(Team, {
    foreignKey: "status_id",
    sourceKey: "id"
});

module.exports = Team;