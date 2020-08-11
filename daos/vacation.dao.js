const Account = require("../models/Account");
const Randomstring = require("randomstring");
const contants = require("../contants/contants");
const Vacation_Employee = require("../models/Vacation_Employee");

//create account
module.exports = {
    createVacation: async(vacationInfo)=>{
        try {
            return await Vacation_Employee.create({
                start_date: vacationInfo.start_date,
                end_date: vacationInfo.end_date,
                created_date: Date.now(),
                employee_id: vacationInfo.employee_id
            }).then(async res => {
                return res;
            })
        } catch (err) {
            console.log(err);
        }
    },
    updateVacation: async (vacationInfo) => {
        try {
            return await Vacation_Employee.update(department, {
                where: { id: vacationInfo.id }
            }).then(async res => {
                return res;
            })
        } catch (err) {
            console.log(err);
        }
    },
    deleteVacation: async (id) => {
        try {
            return await Vacation_Employee.destroy({
                where: { id: id }
            }).then(async res => {
                return res;
            })
        } catch (err) {
            console.log(err);
        }
    },
}