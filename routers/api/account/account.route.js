const express = require("express");
const router = express.Router();
const Account = require("../../../models/Account");
const account_dao = require("../../../daos/account.dao");
const auth = require("../../../middleware/auth.middleware");

router.get("/", async (req, res) => {
    try {
        const account = await Account.findAll();
        res.json(account);
    } catch (err) {
        console.log(err.message);
        res.send("Server error");
    }
});

router.post("/", async (req, res) => {
    var newAccount = req.body;
    console.log(newAccount);
    try {
       var result = await account_dao.createAccount(newAccount);
       res.json(result);
    } catch (err) {
        console.log(err.message);
        res.send("Server error");
    }
});

module.exports = router;
