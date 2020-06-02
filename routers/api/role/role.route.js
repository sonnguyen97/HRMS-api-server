const express = require("express");
const router = express.Router();
const role_dao = require("../../../daos/role.dao");
const auth = require("../../../middlleware/auth.middleware");

router.get("/", async (req, res) => {
    try {
        const roles = await role_dao.findAllRole();
        res.json(roles);
    } catch (err) {
        console.log(err.message);
        res.send("Server error");
    }
});

router.get("/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const role = await role_dao.findByPk(id);
        res.json(role);
    } catch (err) {
        console.log(err.message);
        res.send("Server error");
    }
});

router.post("/", async (req, res) => {
    var newRole = req.body;
    console.log(newRole);
    try {
        var result = await role_dao.createRole(newRole);
        if (result !== undefined) {
            const response = {
                status: "success",
                message: "Create Role success!"
            }
            res.json(response);
        } else if (result === undefined) {
            const response = {
                status: "fail",
                message: "Create Role fail!"
            }
            res.json(response);
        }
    } catch (err) {
        console.log(err.message);
        res.send("Server error");
    }
});

router.put("/", async (req, res) => {
    var role = req.body;
    var role_id = req.body.id;
    console.log(role);
    try {
        var result = await role_dao.updateRole(role, role_id);
        if (result > 0) {
            const response = {
                status: "success",
                message: "Update Role success!"
            }
            res.json(response);
        } else if (result === undefined) {
            const response = {
                status: "fail",
                message: "Update Role fail!"
            }
            res.json(response);
        }
    } catch (err) {
        console.log(err.message);
        res.send("Server error");
    }
});

router.put("/delete", async (req, res) => {
    const id = req.params.id;
    const role = req.body;
    try {
        var result = await role_dao.deleteRole(role, id);
        if (result > 0) {
            const response = {
                status: "success",
                message: "Delete Role success!"
            }
            res.json(response);
        } else if (result === undefined) {
            const response = {
                status: "fail",
                message: "Delete Role fail!"
            }
            res.json(response);
        }
    } catch (err) {
        console.log(err.message);
        res.send("Server error");
    }
});

module.exports = router;