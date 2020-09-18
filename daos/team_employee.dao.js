const Team_Employee = require("../models/Team_Employee");
const Employee = require("../models/Employee");

module.exports = {
    // createTeamEmployee: async (employee, team) => {
    //     try {
    //         employee.forEach(element => {
    //             await Team_Employee.create({
    //                 team_id: team,
    //                 employee_id: element
    //             })
    //         })
    //     } catch (err) {
    //         console.log(err);
    //     }
    // },

    checkTeamEmployee: async (employee, team) => {
        try {
            var listDup = [];
            for(var i = 0; i < employee.length;i++) {
                var element = employee[i];
                await Team_Employee.findOne({
                    where: { 
                        employee_id: element.employeeId,
                        team_id: team
                    }
                }).then(async res => {
                    console.log(res);
                    if(res){
                        var emp = await Employee.findOne({
                            attributes: ['id', 'primary_email'],
                            where: { 
                                id: element.employeeId,
                            }
                        });
                        if(emp){
                            listDup.push(emp);
                        }
                    }
                })
            }
            return listDup;

        } catch (err) {
            console.log(err);
        }
    },
}