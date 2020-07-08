const Sequelize = require("sequelize");
module.exports = new Sequelize('hrms', 'hrms', 'Z@123456', {
    host: '50.62.209.157',
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