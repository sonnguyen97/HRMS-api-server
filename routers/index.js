const express = require("express");
const router = express.Router();

router.use("/accounts", require("./api/account/account.route"));
router.use("/departments", require("./api/department/department.route"));
router.use("/roles", require("./api/role/role.route"));
router.use("/teams", require("./api/team/team.route"));
router.use("/auth", require("./api/authentication/auth.route"));

module.exports = router;