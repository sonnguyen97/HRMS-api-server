const express = require("express");
const router = express.Router();
const AccountTeam = require("../../../models/Account_Team");
const account_team_dao = require("../../../daos/accountTeam.dao");

router.get("/", async (req, res) => {
    try {
        var list = await AccountTeam.findAll();
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
        var listAccount = AccountTeam.findAll({
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
    var listIdAcc = req.body.accId;
    var team = req.body.teamId;
    try {
        var result = await account_team_dao.createAccountsTeam(listIdAcc, team);
        res.json("Success");
    } catch (err) {
        console.log(err);
        res.send("server error");
    }
})

module.exports = router;