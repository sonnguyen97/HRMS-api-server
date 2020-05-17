const express = require("express");
const router = express.Router();
const Account = require("../../../models/Account");
// const account_dao = require("../../..//");
const auth = require("../../../middlleware/auth.middleware");

router.get("/", auth, async (req, res) => {
    try {
        const account = await Account.findOne();
        res.status(200).json(account);
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Server error");
    }
});

module.exports = router;
