const express = require("express");
const router = express.Router();
const accountOperatorStatus_dao = require("../../../daos/AccountOperatorStatus.dao");
const AccountStatus = require("../../../models/AccountOperatorStatus");

router.get("/", async (req, res) => {
    try {
        // const accountOperatorStatus = await accountOperatorStatus_dao.findAllAcoutOperation();
        const accountOperatorStatus = await AccountStatus.findAll();
        res.json(accountOperatorStatus);
    } catch (err) {
        console.log(err);
        res.send("Server error");
    }
});

router.post("/", async (req, res) => {
    var newAccountStatus = req.body;
    try {
        var result = await accountOperatorStatus_dao.createAccountOperatorStatus(newAccountStatus);
        res.json(result);
    } catch (err) {
        console.log(err);
        res.send("Server error");
    }
});

router.delete("/:id", async (req, res) => {
    const id = req.params.id;
    try {
        var result = await accountOperatorStatus_dao.deleteAccountOpetatorStatus(id);
        res.json(result);
    } catch (err) {
        console.log(err);
        res.send("Server error");
    }
});

router.put("/:id", async (req, res)=>{
    const id = req.params.id;
    const status = req.body;
    try {
        var result = await accountOperatorStatus_dao.updateAccountOperatorStatus(status, id);
        res.json(result);
    } catch (err) {
        console.log(err);
        res.send("Server error");
    }
})

module.exports = router;