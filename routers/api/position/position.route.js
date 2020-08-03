const express = require("express");
const router = express.Router();
const role_dao = require("../../../daos/position.dao");
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
        const Position = await role_dao.findByPk(id);
        res.json(Position);
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
                message: "Create Position success!"
            }
            res.json(response);
        } else if (result === undefined) {
            const response = {
                status: "fail",
                message: "Create Position fail!"
            }
            res.json(response);
        }
    } catch (err) {
        console.log(err.message);
        res.send("Server error");
    }
});

router.put("/", async (req, res) => {
    var Position = req.body;
    var position_id = req.body.id;
    console.log(Position);
    try {
        var result = await role_dao.updateRole(Position, position_id);
        if (result > 0) {
            const response = {
                status: "success",
                message: "Update Position success!"
            }
            res.json(response);
        } else if (result === undefined) {
            const response = {
                status: "fail",
                message: "Update Position fail!"
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
    const Position = req.body;
    try {
        var result = await role_dao.deleteRole(Position, id);
        if (result > 0) {
            const response = {
                status: "success",
                message: "Delete Position success!"
            }
            res.json(response);
        } else if (result === undefined) {
            const response = {
                status: "fail",
                message: "Delete Position fail!"
            }
            res.json(response);
        }
    } catch (err) {
        console.log(err.message);
        res.send("Server error");
    }
});

module.exports = router;