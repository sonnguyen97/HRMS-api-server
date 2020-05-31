const express = require("express");
const router = express.Router();

router.use("/accounts", require("./api/account/account.route"));

module.exports = router;