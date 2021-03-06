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

router.get("/getAllActivateDepartment", async (req, res) => {
    try {
        const departments = await department_dao.findAllDepartmentActivate();
        res.json(departments);
    } catch (err) {
        console.log(err.message);
        res.send("Server error");
    }
});

router.get("/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const department = await department_dao.findByPk(id);
        res.json(department);
    } catch (err) {
        console.log(err.message);
        res.send("Server error");
    }
});

router.get("/empdep/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const empList = await department_dao.getAllEmpByDep(id);
        res.json(empList);
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
        if (result.code == 400) {
            const response = {
                status: result.code,
                message: result.status
            }
            res.json(response);
        } else {
            const response = {
                status: 200,
                message: "Create Department success!"
            }
            res.json(response);
        }
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
        if (result.code == 400) {
            const response = {
                status: result.code,
                message: result.status
            }
            console.log(response)
            res.json(response);
        } else {
            const response = {
                status: 200,
                message: "Create Department success!"
            }
            res.json(response);
        }
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
        if (result != null) {
            res.json(results);
        }
    } catch (err) {
        console.log(err.message);
        res.send("Server error");
    }
});

module.exports = router;