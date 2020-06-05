const express = require("express");
const router = express.Router();
const employee_structure = require("./../../../structure/employee");
const team_structure = require("./../../../structure/team");
const department_structure = require("./../../../structure/department");
//model
const Employee = require("./../../../models/Employee");
const Team = require("./../../../models/Team");
const Department = require("./../../../models/Department");


router.get('/', async (req, res) => {
    try {
        var structure = {
            employees: [],
            teams: [],
            departments: []
        }
        //get employees
        var a = await Employee.findAll();
        await a.map(item => {
            employee_structure.employee.id = item.id;
            employee_structure.employee.primary_email = item.primary_email;
            employee_structure.employee.personal_email = item.personal_email;
            employee_structure.employee.first_name = item.first_name;
            employee_structure.employee.last_name = item.last_name;
            employee_structure.employee.modified_date = item.modified_date;
            employee_structure.employee.is_active = !item.status_id == 0 ? true : false;
            employee_structure.employee.address = item.address;
            employee_structure.employee.department_id = !item.department_id == null ? item.department_id : 0;
            employee_structure.employee.phone = item.phone;
            structure.employees.push(employee_structure.employee);
        })
        //get teams
        var b = await Team.findAll();
        await b.map(item => {
            team_structure.team.id = item.id;
            team_structure.team.name= item.name;
            team_structure.team.team_email = item.email;
            team_structure.team.description = item.description;
            team_structure.team.is_active = !item.status_id == 0 ? true : false;
            structure.teams.push(team_structure.team);
        });

        // get derpartments
        var c = await Department.findAll(); 
        await c.map(item => {
            structure.departments.push(item);
        })


        res.json(structure);
    } catch (error) {
        res.status(500).json("System error!" + error)
    }
});

module.exports = router;