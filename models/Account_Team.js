const Sequelize = require("sequelize");
const db = require("../config/db-connection");
const Account = require("./Account");
const Team = require("./Team");

const Account_Team = db.define(
    "Account_Team",
    {
        account_id: {
            type: Sequelize.STRING,
            primaryKey: true
        },
        team_id: {
            type: Sequelize.STRING,
            primaryKey: true
        }
    },
    {
        timestamps: false,
        freezeTableName: true
    }
);

Account_Team.belongsTo(Account, {
    foreignKey: "account_id",
    sourceKey: "id"
});
Account.hasMany(Account_Team, {
    foreignKey: "account_id",
    sourceKey: "id"
}),

    Account_Team.belongsTo(Team, {
        foreignKey: "team_id",
        sourceKey: "id"
    });
Team.hasMany(Account_Team, {
    foreignKey: "team_id",
    sourceKey: "id"
});

module.exports = Account_Team;