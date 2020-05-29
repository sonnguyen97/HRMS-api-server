const Sequelize = require("sequelize");
module.exports = new Sequelize('ncsoncom_GmHRSv1', 'ncsoncom_GmHRSv1', 'capstonesummer2020', {
    host: '148.72.153.56',
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