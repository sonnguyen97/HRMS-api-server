const express = require("express");
const router = express.Router();

router.use("/accounts", require("./api/account/account.route"));
router.use("/departments", require("./api/department/department.route"));
router.use("/roles", require("./api/position/position.route"));
router.use("/teams", require("./api/team/team.route"));
router.use("/auth", require("./api/authentication/auth.route"));
router.use("/accountOpetatorStatus", require("./api/account_operator_status/account_operator_status.route"));
// router.use("/accountTeam", require("./api/account_team/account_team.route"));
router.use("/teamEmployee", require("./api/team_employee/team_employee.route"));
router.use("/employees", require("./api/employee/employee.route"));
router.use("/vacation", require("./api/vacation/vacation.route"));
router.use("/positions", require("./api/position/position.route"));
// api data for synchronize
router.use("/data-hrms", require("./api/data_sync/index"));
router.use("/auth", require("./api/authentication/auth.route"));

module.exports = router;