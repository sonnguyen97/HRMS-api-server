const Sequelize = require("sequelize");
module.exports = new Sequelize('hrms', 'hrms', 'Zz@123456', {
    host: '103.143.209.237',
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