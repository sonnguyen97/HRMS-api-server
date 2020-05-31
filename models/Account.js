const Sequelize = require("sequelize");
const db = require("../config/db-connection");
const Role = require("./Role");
const Department = require("./Department");
const AccountOperatorStatus = require("./AccountOperatorStatus");

const Account = db.define(
  "account",
  {
    id: {
      type: Sequelize.STRING,
      primaryKey: true
    },
    email: {
      type: Sequelize.STRING
    },
    password: {
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
//role
Account.belongsTo(Role,{
  foreignKey: "role_id",
  sourceKey: "id"
});
Role.hasMany(Account,{
  foreignKey: "role_id",
  sourceKey: "id"
});
//department
Account.belongsTo(Department,{
  foreignKey:"department_id",
  sourceKey: "id"
});
Department.hasMany(Account,{
  foreignKey: "department_id",
  sourceKey: "id"
});
//status
Account.belongsTo(AccountOperatorStatus,{
  foreignKey: "status_id",
  sourceKey: "id"
});
AccountOperatorStatus.hasMany(Account,{
  foreignKey: "status_id",
  sourceKey: "id"
})


module.exports = Account;
