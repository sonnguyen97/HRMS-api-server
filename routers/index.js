const express = require("express");
const router = express.Router();

router.use("/accounts", require("./api/account/account.route"));
router.use("/departments", require("./api/department/department.route"));
router.use("/auth", require("./api/authentication/auth.route"));
router.use("/accountopetatorstatus", require("./api/AccountOperatorStatus/AccountOperatorStatus.route"));

module.exports = router;