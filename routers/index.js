const express = require("express");
const router = express.Router();

router.use("/accounts", require("./api/account/account.route"));
router.use("/auth", require("./api/authentication/auth.route"));

module.exports = router;