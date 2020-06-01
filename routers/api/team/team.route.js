const express = require("express");
const router = express.Router();
const team_dao = require("../../../daos/team.dao");
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
        if (result !== undefined) {
            const response = {
                status: "success",
                message: "Create Team success!"
            }
            res.json(response);
        } else if (result === undefined) {
            const response = {
                status: "fail",
                message: "Create Team fail!"
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
        if (result > 0) {
            const response = {
                status: "success",
                message: "Update Team success!"
            }
            res.json(response);
        } else if (result === undefined) {
            const response = {
                status: "fail",
                message: "Update Team fail!"
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

module.exports = router;