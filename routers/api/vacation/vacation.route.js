const express = require("express");
const router = express.Router();
const vacation_dao = require("../../../daos/vacation.dao");
const Vacation_Employee = require("../../../models/Vacation_Employee");

router.post("/create", async(req,res)=> {
    var request = req.body;
    const vacation =new Vacation_Employee();
    try {
        if(vacation != null && vacation != undefined){
            vacation.start_date = request.start_date;
            vacation.end_date = request.end_date;
            vacation.employee_id = request.employee_id;
            await vacation_dao.createVacation(vacation);
            res.status(200).json("create success");
        }else{
            res.status(400).send("server error");
        }
    } catch (err) {
        console.log(err);
        res.send("server error");
    }
})

router.put("/update", async(req,res)=> {
    var request = req.body;
    const vacation =new Vacation_Employee();
    vacation = request;
    try {
        if(vacation != null && vacation != undefined){
            await vacation_dao.updateVacation(vacation);
            res.status(200).json("update success");
        }else{
            res.status(400).send("server error");
        }
    } catch (err) {
        console.log(err);
        res.send("server error");
    }
})

router.put("/delete", async(req,res)=> {
    var id = req.params.id;
    try {
        if(id != null && id != undefined){
            await vacation_dao.deleteVacation(id);
            res.status(200).json("update success");
        }else{
            res.status(400).send("server error");
        }
    } catch (err) {
        console.log(err);
        res.send("server error");
    }
})

module.exports = router;