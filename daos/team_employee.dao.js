const Team_Employee = require("../models/Team_Employee");

module.exports = {
    createTeamEmployee: async(employee, team) => {
        try {
            employee.forEach(element => {
                Team_Employee.create({
                    team_id: team,
                    employee_id: element
                })
            })
        } catch(err) {
            console.log(err);
        }
    },
    // getAllAccountByTeamId: async(teamId) =>{
    //     try {
    //         return await AccountTeam.findAll({
    //             where:{team_id: teamId}
    //         }).then(async res =>{
    //             return res;
    //         })
    //     } catch (err) {
    //         console.log(err);
    //     }
    // }
}