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
        res.json(result);
    } catch (err) {
        console.log(err.message);
        res.send("Server error");
    }
});

router.put("/:id", async (req, res) => {
    var role = req.body;
    var role_id = req.params.id;
    console.log(role);
    try {
        var result = await role_dao.updateRole(role, role_id);
        res.json(result);
    } catch (err) {
        console.log(err.message);
        res.send("Server error");
    }
});

router.put("/delete/:id", async (req, res) => {
    const id = req.params.id;
    const role = req.body;
    try {
        var result = await role_dao.deleteRole(role, id);
        res.json(result);
    } catch (err) {
        console.log(err.message);
        res.send("Server error");
    }
});

module.exports = router;