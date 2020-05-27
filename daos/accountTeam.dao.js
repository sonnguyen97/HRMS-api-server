const AccountTeam = require("../models/Account_Team");

module.exports = {
    createAccountsTeam: async(accTeam, teamId) => {
        try {
            accTeam.forEach(element => {
                AccountTeam.create({
                    account_id: element.id,
                    team_id: teamId
                })
                // console.log(element + teamId);
            })
        } catch(err) {
            console.log(err);
        }
    },
}