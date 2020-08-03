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
const Role = require("./../../../models/Role");
const { mode } = require("crypto-js");


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
                'first_name', 'last_name', 'modified_date', 'address',
                'department_id', 'phone', 'status_id'],
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
        console.log("----Get all employee from HRMS---");

        structure.employees = [...structure.employees, ...employeeResponse];

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
        var positionResponse = await Role.findAll();
        structure.positions = positionResponse;


        res.json(structure);
    } catch (error) {
        res.status(500).json("System error!" + error)
    }
});

module.exports = router;