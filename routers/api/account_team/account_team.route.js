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

router.post("/:id", async (req, res) => {
    var listIdAcc = req.body;
    const teamId = req.params.id;
    // console.log(listIdAcc);
    // console.log(teamId);
    try {
        // listIdAcc.forEach(element => {
        //     AccountTeam.create({
        //         account_id: element.id,
        //         team_id: teamId
        //     })
        //     console.log(element + teamId);
        // })
        var result =  await account_team_dao.createAccountsTeam(listIdAcc,teamId);
        res.json("Added");
    } catch (err) {
        console.log(err);
        res.send("server error");
    }
})

module.exports = router;