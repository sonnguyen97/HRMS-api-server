const express = require("express");
const router = express.Router();
const Department = require("../../../models/Department");
const department_dao = require("../../../daos/department.dao");
const auth = require("../../../middlleware/auth.middleware");

router.get("/", async (req, res) => {
    try {
        const department = await Department.findAll();
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

// router.delete("/:id", async (req, res) => {
//     const id = req.params.id;
//     try {
//         const department = await Department.destroy({
//             where: { id: id }
//         })
//         res.status(200).send("Delete Account by id:" + id + " susscessfully.");
//     } catch (err) {
//         console.log(err.message);
//         res.send("Server error");
//     }
// });

module.exports = router;