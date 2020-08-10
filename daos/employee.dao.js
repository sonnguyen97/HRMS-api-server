const Employee = require("../models/Employee");
const contants = require("../contants/contants");
const Position = require("../models/Position");
const Team_Employee = require("../models/Team_Employee");
const Vacation_Employee = require("../models/Vacation_Employee");

module.exports = {
    getAllEmployeee: async () => {
        try {
            return await Employee.findAll(
                {
                    attributes: ['id', 'email', 'created_date', 'modified_date'],
                    include: [{
                        model: Department,
                        attributes: ['name']
                    },
                    {
                        model: Vacation_Employee,
                        attributes: ['id','start_date','end_date']
                    }
                    {
                        model: Position,
                        attributes: ['name']
                    }],
                    where: { status_id: contants.EMPLOYEE_STATUS_ACTIVE }
                }
            )
        } catch (err) {
            console.log(err);
        }
    },
    createEmployee: async (employee) => {
        try {
            var checEmpExisted = await Employee.count({ where: { primary_email: employee.primary_email } });
            if (checEmpExisted == 0) {
                return await Employee.create({
                    primary_email: employee.primary_email,
                    personal_email: employee.personal_email,
                    phone: employee.phone,
                    first_name: employee.first_name,
                    last_name: employee.last_name,
                    address: employee.address,
                    created_date: Date.now(),
                    status_id: contants.ACCOUNT_STATUS_ACTIVE,
                    position_id: contants.EMPLOYEE_ROLE
                }).then(async res => {
                    return res;
                })
            } else { return false; }
        } catch (err) {
            console.log(err);
        }
    },
    getEmployeeById: async (id) => {
        try {
            return await Employee.findOne(
                {
                    attributes: ['id', 'email', 'created_date', 'modified_date'],
                    include: [{
                        model: Position,
                        attributes: ['name']
                    }],
                    where: { id: id }
                },
                { where: { status_id: contants.EMPLOYEE_STATUS_ACTIVE } }
            ).then(async res => {
                return res;
            })
        } catch (err) {
            console.log(err);
        }
    },
    deactiveEmployeeById: async (id) => {
        try {
            var checkEmpExisted = await Employee.count({ where: { id: id } });
            if (checkEmpExisted != 0) {
                return await Employee.update(
                    {
                        status_id: contants.EMPLOYEE_STATUS_DEACTIVE
                    },
                    { where: { id: id } }
                ).then(async res => {
                    return res;
                })
            } else { return false; }
        } catch (err) {
            console.log(err);
        }
    },
    updateEmoloyee: async (employee) => {
        try {
            var checkEmpExisted = await Employee.count({ where: { id: employee.id } });
            if (checkEmpExisted != 0) {
                return await Employee.update(
                    {
                        personal_email: employee.personal_email,
                        phone: employee.phone,
                        address: employee.address
                    },
                    { where: { id: employee.id } },

                )
            } else { return false };
        } catch (err) {
            console.log(err);
        }
    },
    addEmployeeToTeam: async (employee) => {
        try {
            var listAccount = employee.listEmployee;
            var teamId = employee.teamId;

            listAccount.forEach(async account => {
                await Team_Employee.create({
                    team_id: teamId,
                    employee_id: account.employeeId
                })
            })
            return true;
        } catch (err) {
            console.log(err);
            return false;
        }
    }

}