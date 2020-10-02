const express = require("express");
const router = express.Router();
const team_dao = require("../../../daos/team.dao");
const team_employee_dao = require("../../../daos/team_employee.dao");
const auth = require("../../../middlleware/auth.middleware");

router.get("/", async (req, res) => {
    try {
        const teams = await team_dao.findAllTeam();
        res.json(teams);
    } catch (err) {
        console.log(err.message);
        res.send("Server error");
    }
});

router.get("/team-activated", async (req, res) => {
    try {
        const teams = await team_dao.findAllTeamActivated();
        res.json(teams);
    } catch (err) {
        console.log(err.message);
        res.send("Server error");
    }
});

router.get("/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const team = await team_dao.findByPk(id);
        res.json(team);
    } catch (err) {
        console.log(err.message);
        res.send("Server error");
    }
});

router.post("/", async (req, res) => {
    var newTeam = req.body;
    console.log(newTeam);
    try {
        var result = await team_dao.createTeam(newTeam);
        if (result.code == 400) {
            const response = {
                status: result.code,
                message: result.status
            }
            res.json(response);
        } else {
            const response = {
                status: 200,
                message: "Team is created!"
            }
            res.json(response);
        }
    } catch (err) {
        console.log(err.message);
        res.send("Server error");
    }
});

router.put("/", async (req, res) => {
    var team = req.body;
    var team_id = req.body.id;
    console.log(team);
    try {
        var result = await team_dao.updateTeam(team, team_id);
        if (result.code == 400) {
            const response = {
                status: result.code,
                message: result.status
            }
            res.json(response);
        } else {
            const response = {
                status: 200,
                message: "Team is updated!"
            }
            res.json(response);
        }
    } catch (err) {
        console.log(err.message);
        res.send("Server error");
    }
});

router.put("/delete", async (req, res) => {
    const id = req.body.id;
    const team = req.body;
    try {
        var result = await team_dao.deleteTeam(team, id);
        if (result !== undefined) {
            const response = {
                status: "success",
                message: "Delete Team success!"
            }
            res.json(response);
        } else if (result === undefined) {
            const response = {
                status: "fail",
                message: "Delete Team fail!"
            }
            res.json(response);
        }
    } catch (err) {
        console.log(err.message);
        res.send("Server error");
    }
});

router.put("/empdelete", async (req, res) => {
    const delEmp = req.body;
    try {
        if (delEmp != undefined && delEmp.teamId != undefined && delEmp.empId != undefined) {
            var result = await team_dao.removeEmpOfTeam(delEmp);
            res.json(result);
            // if (result !== undefined) {
            //     const response = {
            //         status: 200,
            //         message: "Delete Team success!"
            //     }
            //     res.json(response);
            // } else if (result === undefined) {
            //     const response = {
            //         status: 500,
            //         message: "Delete Team fail!"
            //     }
            //     res.json(response);
            // }
        } else {
            const response = {
                status: 400,
                message: "Wrong input!"
            }
            res.json(response);
        }
    } catch (err) {
        console.log(err.message);
        res.send("Server error");
    }
});
router.post("/checkdup", async (req, res) => {
    const employee = req.body;
    var listAccount = employee.listEmployee;
    var teamId = employee.teamId;
    try {
        var result = await team_employee_dao.checkTeamEmployee(listAccount,teamId);
        res.json(result);
    } catch (err) {
        console.log(err);
        res.send("server error");
    }
})  

module.exports = router;