const express = require("express");
const router = express.Router();
const department_dao = require("../../../daos/department.dao");
const auth = require("../../../middlleware/auth.middleware");

router.get("/", async (req, res) => {
    try {
        const departments = await department_dao.findAllDepartment();
        res.json(departments);
    } catch (err) {
        console.log(err.message);
        res.send("Server error");
    }
});

router.get("/byID", async (req, res) => {
    const id = req.body.id;
    try {
        const department = await department_dao.findByPk(id);
        res.json(department);
    } catch (err) {
        console.log(err.message);
        res.send("Server error");
    }
});

router.post("/", async (req, res) => {
    var newDepartment = req.body;
    console.log(newDepartment);
    try {
        var result = await department_dao.createDepartment(newDepartment);
        res.json(result);
    } catch (err) {
        console.log(err.message);
        res.send("Server error");
    }
});

router.put("/", async (req, res) => {
    var department = req.body;
    var department_id = req.body.id;
    console.log(department);
    try {
        var result = await department_dao.updateDepartment(department, department_id);
        res.json(result);
    } catch (err) {
        console.log(err.message);
        res.send("Server error");
    }
});

router.put("/delete", async (req, res) => {
    const id = req.body.id;
    const department = req.body;
    try {
        var result = await department_dao.deleteDepartment(department, id);
        res.json(result);
    } catch (err) {
        console.log(err.message);
        res.send("Server error");
    }
});

module.exports = router;