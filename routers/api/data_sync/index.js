const express = require("express");
const router = express.Router();
//model
const Employee = require("./../../../models/Employee");
const Team = require("./../../../models/Team");
const Department = require("./../../../models/Department");
const Team_Employee = require("./../../../models/Team_Employee");
const Position = require("../../../models/Position");
const Vacation = require("../../../models/Vacation");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const sequelize = require("sequelize");
const auth = require("../../../middlleware/auth.middleware");
// const moment = require('moment');


router.get('/', auth, async (req, res) => {
    try {
        var structure = {
            isAuthenticated: true,
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
                    as: 'department',
                    attributes: ['id', 'name', 'email'],
                },
                {
                    model: Position,
                    as:'position',
                    attributes: ['id', 'name'],
                }
                // {
                //     model: Team_Employee,
                //     as: 'teams',
                //     attributes: ['team_id'],
                //     order: [
                //         ['team_id', 'ASC']
                //     ]
                // }
            ],
            order: [
                ['primary_email', 'ASC']
            ],
            where: { status_id: 1 }
        });

        const sql = "SELECT id, created_date, employee_id, start_date, end_date FROM vacation_date AS vacation_date WHERE (current_date() between date(vacation_date.start_date) and date(vacation_date.end_date)) OR date(vacation_date.start_date) >= current_date() ORDER BY vacation_date.start_date DESC";
        const vacation = await Vacation.sequelize.query(sql, { type: sequelize.QueryTypes.SELECT });
        // console.log(today.toISOString().substring(0, 10));
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
                    as: 'members',
                    include: [
                        {
                            attributes: ['primary_email', ['id', 'employee_id']],
                            model: Employee,
                            as: 'employee',
                            order: [['id', 'ASC']],
                            // where: { status_id: 1 }

                        }
                    ]
                }],
            where: {
                status_id: 1
            },
            order: [['email', "ASC"]]
        }
        );

        structure.teams = [...structure.teams, ...teamResponse];

        // get derpartments
        var departmentResponse = await Department.findAll({
            where: {
                status_id: 1
            },
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