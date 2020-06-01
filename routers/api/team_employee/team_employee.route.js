const express = require("express");
const router = express.Router();
const Team_Employee = require("../../../models/Team_Employee");
const team_employee_dao = require("../../../daos/team_employee.dao");
const Employee = require("../../../models/Employee");

router.get("/", async (req, res) => {
    try {
        var list = await Team_Employee.findAll();
        res.json(list);
    } catch (err) {
        console.log(err);
        res.send("server error");
    }
});

router.get("/:id", async (req, res) => {
    const teamId = req.params.id;
    try {
        // var listAccount = account_team_dao.getAllAccountByTeamId(teamId);
        var listAccount = Team_Employee.findAll({
            include:[{
                model: Employee,
                as : 'employee',
                attributes: [''],
            }], 
            where: {team_id: teamId}
        })
        console.log(listAccount);
        res.json(listAccount);
    } catch (err) {
        console.log(err);
        res.send("Server error");
    }
});

router.post("/", async (req, res) => {
    var employee = req.body.empId;
    var team = req.body.teamId;
    try {
        var result = await team_employee_dao.createTeamEmployee(employee,team);
        res.json("Success");
    } catch (err) {
        console.log(err);
        res.send("server error");
    }
})

module.exports = router;