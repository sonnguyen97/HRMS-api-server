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


router.post('/', async (req, res) => {
    try {
        const offset = req.body.offset;
        const limit = req.body.limit;
        var structure = {
            employees: [],
            teams: [],
            departments: []
        }
        //get employees
        var employeeResponse = await Employee.findAll({
            attributes: ['id', 'primary_email', 'personal_email', 
            'first_name','last_name', 'modified_date', 'address', 
            'department_id', 'phone', 'status_id'],
            limit: limit,
            offset: offset,
        });
        structure.employees = [...structure.employees, ...employeeResponse];
        // await employeeResponse.map(item => {
        //     employee_structure.employee.id = item.id;
        //     employee_structure.employee.primary_email = item.primary_email;
        //     employee_structure.employee.personal_email = item.personal_email;
        //     employee_structure.employee.first_name = item.first_name;
        //     employee_structure.employee.last_name = item.last_name;
        //     employee_structure.employee.modified_date = item.modified_date;
        //     employee_structure.employee.is_active = !item.status_id == 0 ? true : false;
        //     employee_structure.employee.address = item.address;
        //     employee_structure.employee.department_id = !item.department_id == null ? item.department_id : 0;
        //     employee_structure.employee.phone = item.phone;
        //     structure.employees.push(employee_structure.employee);
        // })
        //get teams
        var teamResponse = await Team.findAll({
            include: [
                {   
                    attributes: ['employee_id', 'modified_date'],
                    model: Team_Employee,
                    as:'members'
                }]
        }
        );

        structure.teams = [...structure.teams, ...teamResponse];

        // get derpartments
        var departmentResponse = await Department.findAll();
        await departmentResponse.map(item => {
            department_structure.department.id = item.id;
            department_structure.department.name = item.name;
            department_structure.department.description = item.description;
            department_structure.department.status_id = item.status_id == 1 ? true : false;
            department_structure.department.modified_date = item.modified_date;
            structure.departments.push(item);
        })


        res.json(structure);
    } catch (error) {
        res.status(500).json("System error!" + error)
    }
});

module.exports = router;