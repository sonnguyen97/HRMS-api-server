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
        res.json(result);
    } catch (err) {
        console.log(err.message);
        res.send("Server error");
    }
});

router.put("/:id", async (req, res) => {
    var team = req.body;
    var team_id = req.params.id;
    console.log(team);
    try {
        var result = await team_dao.updateTeam(team, team_id);
        res.json(result);
    } catch (err) {
        console.log(err.message);
        res.send("Server error");
    }
});

router.put("/delete/:id", async (req, res) => {
    const id = req.params.id;
    const team = req.body;
    try {
        var result = await team_dao.deleteTeam(team, id);
        res.json(result);
    } catch (err) {
        console.log(err.message);
        res.send("Server error");
    }
});

module.exports = router;