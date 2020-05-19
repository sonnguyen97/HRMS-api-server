const express = require("express");
const router = express.Router();

router.use("/api/accounts", require("./api/account/account.route"));
router.use("/api/auth", require("./api/authentication/auth.route"));

module.exports = router;