const express = require("express");
const router = express.Router();
const employee_structure = require("./../../../structure/employee");
const team_structure = require("./../../../structure/team");
const department_structure = require("./../../../structure/department");
//model
const Employee = require("./../../../models/Employee");
const Team = require("./../../../models/Team");
const Department = require("./../../../models/Department");
const Team_Employee = require("./../../../models/Team_Employee");
const Position = require("../../../models/Position");
const Vacation = require("../../../models/Vacation");
const { mode } = require("crypto-js");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;


router.get('/', async (req, res) => {
    try {
        var structure = {
            employees: [],
            teams: [],
            departments: [],
            positions: []
        }
        //get employees
        var employeeResponse = await Employee.findAll({
            attributes: ['id', 'primary_email', 'personal_email',
                'first_name', 'last_name', 'modified_date', 'address', 'position_id',
                'department_id', 'phone', 'status_id', 'vacation_start_date', 'vacation_end_date'],
            include: [
                {
                    model: Department,
                    attributes: ['id', 'name'],
                    where: {
                        status_id: 1
                    }
                }
            ],
            order: [
                ['primary_email', 'ASC']
            ]
        });

        var reponse = [];
        var today = new Date();
        var vacation = await Vacation.findAll({
            where: {
                [Op.or]: [{start_date: { [Op.eq]: today.toISOString().substring(0, 10) }}, {start_date: { [Op.gt]: today.toISOString().substring(0, 10) }}]
                
            },

            order: [['start_date', 'ASC']],
            limit: 1
        });
        console.log(vacation);
        if (vacation.length > 0) {
            for (let i = 0; i < employeeResponse.length; i++) {
                for (let j = 0; j < vacation.length; j++) {
                    if (employeeResponse[i].id === vacation[j].employee_id) {
                        employeeResponse[i].vacation_start_date = vacation[j].start_date;
                        employeeResponse[i].vacation_end_date = vacation[j].end_date;
                    }
                }
            }
        }
        console.log("----Get all employee from HRMS---");

        structure.employees = employeeResponse;

        var teamResponse = await Team.findAll({
            include: [
                {
                    attributes: ['employee_id', 'modified_date'],
                    model: Team_Employee,
                    include: [
                        {
                            attributes: ['primary_email'],
                            model: Employee
                        }
                    ],
                    as: 'members'
                }],
            order: [['email', "ASC"]]
        }
        );

        structure.teams = [...structure.teams, ...teamResponse];

        // get derpartments
        var departmentResponse = await Department.findAll({
            order: [['name', "ASC"]]
        });
        await departmentResponse.map(item => {
            structure.departments.push(item);
        })
        var positionResponse = await Position.findAll({
            order: [['name', 'ASC']]
        });
        structure.positions = positionResponse;


        res.json(structure);
    } catch (error) {
        res.status(500).json("System error!" + error)
    }
});

module.exports = router;