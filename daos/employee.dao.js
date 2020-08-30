const Employee = require("../models/Employee");
const contants = require("../contants/contants");
const Position = require("../models/Position");
const Team_Employee = require("../models/Team_Employee");
const Vacation_Employee = require("../models/Vacation_Employee");
const Department = require("../models/Department");
const Sequelize = require("sequelize");
const Team = require("../models/Team");
const Op = Sequelize.Op;
module.exports = {
    getAllEmployeee: async () => {
        try {
            return await Employee.findAll(
                {
                    attributes: ['id', 'first_name', 'last_name', 'primary_email', 'personal_email', 'phone', 'created_date', 'modified_date', 'status_id'],
                    include: [{
                        model: Department,
                        attributes: ['name']
                    },
                    {
                        model: Position,
                        attributes: ['name']
                    }],
                    order: [['status_id', "ASC"]],
                }
            )
        } catch (err) {
            console.log(err);
        }
    },
    createEmployee: async (employee) => {
        try {
            var checkEmpExisted = await Employee.count({ where: { primary_email: employee.primary_email } });
            if (checkEmpExisted) {
                return { code: 400, status: "Employee is existed!" };
            }
            var checkEmpExistedTeam = await Team.count({ where: { email: employee.primary_email } });
            if (checkEmpExistedTeam) {
                return { code: 400, status: "Email is duplicate with team!" };
            }
            var checkEmpExistedDep = await Department.count({ where: { email: employee.primary_email } });
            if (checkEmpExistedDep) {
                return { code: 400, status: "Email is duplicate with department!" };
            }
            return await Employee.create({
                primary_email: employee.primary_email,
                personal_email: employee.personal_email,
                phone: employee.phone,
                first_name: employee.first_name,
                last_name: employee.last_name,
                address: employee.address,
                created_date: Date.now(),
                department_id: employee.department_id,
                status_id: contants.ACCOUNT_STATUS_ACTIVE,
                position_id: employee.position_id
            }).then(async res => {
                return { code: 200, status: "Employee is created!" };
            });
        } catch (err) {
            console.log(err);
        }
    },
    getEmployeeById: async (id) => {
        try {
            var today = new Date();
            return await Employee.findOne(
                {
                    attributes: ['id', 'primary_email', 'personal_email', 'phone', 'address', 'first_name', 'last_name', 'created_date', 'modified_date', 'status_id'],
                    include: [{
                        model: Position,
                        attributes: ['name']
                    },
                    {
                        model: Vacation_Employee,
                        attributes: ['id', 'start_date', 'end_date'],
                        // where : {start_date : {[Op.gte]: today} },
                        order: [['start_date,', "DESC"]]
                    },
                    {
                        model: Department,
                        attributes: ['id', 'name']
                    },
                    ],
                    where: { id: id },
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
                        first_name: employee.first_name,
                        last_name: employee.last_name,
                        primary_email: employee.primary_email,
                        personal_email: employee.personal_email,
                        phone: employee.phone,
                        address: employee.address,
                        department_id: employee.departmentId,
                        status_id: employee.status_id
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