const Sequelize = require("sequelize");
module.exports = new Sequelize('hrms', 'hrms', 'Zz@12345', {
    host: '198.71.225.61',
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