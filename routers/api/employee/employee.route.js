const express = require("express");
const router = express.Router();
const employe_dao = require("../../../daos/employee.dao");

router.get("/", async (req, res) => {
    try {
        const listEmp = await employe_dao.getAllEmployeee();
        res.json(listEmp);
    } catch (err) {
        console.log(err);
        res.send("server error");
    }
});

router.get("/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const emp = await employe_dao.getEmployeeById(id);
        res.json(emp);
    } catch (err) {
        console.log(err);
        res.send("server error");
    }
});

router.post("/addToTeam", async (req, res) => {
    const listEmployee = req.body;
    try {
        const emp = await employe_dao.addEmployeeToTeam(listEmployee);
        
        if(emp) {
            res.json({ 
                status: "success",
                message: "adding employee to team success!"
            });
        } else { 
            res.json({ 
                status: "fail",
                message: "adding employee to team fail!"
            });
        }
    } catch (err) {
        console.log(err);
        res.send("server error");
    }
});

router.post("/", async (req, res) => {
    var newEmp = req.body;
    try {
        var result = await employe_dao.createEmployee(newEmp);
        res.json(result);
    } catch (err) {
        console.log(err);
        res.send("server error");
    }
});

router.delete("/:id", async (req, res) => {
    var id = req.params.id;
    try {
        await employe_dao.deactiveEmployeeById(id);
        res.status(200).json("success");
    } catch (err) {
        console.log(err);
        res.send("server error");
    }
});

router.put("/", async(req,res)=> {
    var employee = req.body;
    console.log(employee);
    try {
        await employe_dao.updateEmoloyee(employee);
        if (result.code == 400) {
            const response = {
                status: result.code,
                message: result.status
            }
            res.json(response);
        } else {
            const response = {
                status: 200,
                message: "Employee is updated!"
            }
            res.json(response);
        }
    } catch (err) {
        console.log(err);
        res.send("server error");
    }
})

module.exports = router;