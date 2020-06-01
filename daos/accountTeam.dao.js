const AccountTeam = require("../models/Account_Team");

module.exports = {
    createAccountsTeam: async(accTeam, team) => {
        try {
            accTeam.forEach(element => {
                AccountTeam.create({
                    account_id: element,
                    team_id: team
                })
            })
        } catch(err) {
            console.log(err);
        }
    },
    getAllAccountByTeamId: async(teamId) =>{
        try {
            return await AccountTeam.findAll({
                where:{team_id: teamId}
            }).then(async res =>{
                return res;
            })
        } catch (err) {
            console.log(err);
        }
    }
}