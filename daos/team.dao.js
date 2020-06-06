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
            return false;
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
            var response = {
                id: '',
                groupName: '',
                email: '',
                description: '',
                suspended: '',
                members: []
            }
            var team = await Team.findOne({ where: { id: id } });
            return await Team_Employee.findAll({
                where: { team_id: id },
                include: [Employee]
            }).then(async res => {
                response.id = team.id;
                response.groupName = team.name;
                response.email = team.email;
                response.description = team.description;
                if (team.status_id == 0) {
                    response.suspended = false;
                } else {
                    response.suspended = true;
                }
                res.map(item => {
                    response.members.push(item.dataValues.employee);
                })
                return response;
            })

        } catch (err) {
            console.log(err);
        }
    },
};

