const Sequelize = require("sequelize");
const db = require("../config/db-connection");
const TeamOperatorStatus = require("./TeamOperatorStatus");

const Team = db.define(
    "Team",
    {
        id: {
            type: Sequelize.STRING,
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
    }
);

Team.belongsTo(TeamOperatorStatus,{
    foreignKey: "status_id",
    sourceKey: "id"
});

TeamOperatorStatus.hasMany(Team,{
    foreignKey: "status_id",
    sourceKey: "id"
});

module.exports = Team;