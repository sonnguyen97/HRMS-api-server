const express = require("express");
const router = express.Router();
const Department_Employee = require("../../../models/Department_Employee");
const department_employee_dao = require("../../../daos/department_employee.dao");
const Employee = require("../../../models/Employee");
const Department = require("../../../models/Department");

router.get("/", async (req, res) => {
    try {
        var list = await Department_Employee.findAll();
        res.json(list);
    } catch (err) {
        console.log(err);
        res.send("server error");
    }
});


//get list employee by teamId
router.get("/:id", async (req, res) => {
    const teamId = req.params.id;
    try {
        // var listAccount = account_team_dao.getAllAccountByTeamId(teamId);
        // var listAccount = Team_Employee.findAll({
        //     include:[{
        //         model: Employee,
        //         as : 'employee',
        //         attributes: [''],
        //     }], 
        //     where: {team_id: teamId}
        // })
        // console.log(listAccount);
        // res.json(listAccount);
    } catch (err) {
        console.log(err);
        res.send("Server error");
    }
});

router.post("/", async (req, res) => {
    var employee = req.body.empId;
    var department = req.body.departmentId;
    try {
        var result = await department_employee_dao.createDepartmentEmployee(employee,department);
        res.json("Success");
    } catch (err) { 
        console.log(err);
        res.send("server error");
    }
})

module.exports = router;