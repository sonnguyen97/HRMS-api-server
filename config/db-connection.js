const Sequelize = require("sequelize");
module.exports = new Sequelize('hrms', 'root', 'Zz@12345', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306,
    timestamps: false,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
 }
});