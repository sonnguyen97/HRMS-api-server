const Team = require("../models/Team");
const Employee = require("../models/Employee");
const Team_Employee = require("../models/Team_Employee");
module.exports = {
    createTeam: async (team) => {
        try {
            return await Team.create({
                name: team.name,
                created_date: Date.now(),
                status_id: team.status_id
            }).then(async res => {
                return res;
            })
        } catch (err) {
            console.log(err);
        }
    },

    updateTeam: async (team, team_id) => {
        try {
            return await Team.update(team, {
                where: { id: team_id }
            }).then(async res => {
                return res;
            })
        } catch (err) {
            console.log(err);
        }
    },

    deleteTeam: async (team, id) => {
        try {
            return await Team.update(team, {
                where: { id: id }
            }).then(async res => {
                return res;
            })
        } catch (err) {
            console.log(err);
        }
    },

    findAllTeam: async () => {
        try {
            return await Team.findAll({
                where: { status_id: 1 }
            }).then(async res => {
                return res;
            })
        } catch (err) {
            console.log(err);
        }
    },

    findByPk: async (id) => {
        try {
            var members= [];
            var response = {
                id: '',
                groupName: '',
                email:'',
                description: '',
                suspended: '',
                members: []
            }
           return await Team_Employee.findAll({
                where: { team_id: id },
                include: [{model: Employee}],
                raw: false
            }).then(async res => {
                res.map(item => {
                    response.members.push(item);
                })
                return response;
            })
        } catch (err) {
            console.log(err);
        }
    },
};

