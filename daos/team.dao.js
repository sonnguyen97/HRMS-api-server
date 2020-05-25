const Team = require("../models/Team");

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

};

module.exports = {
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
};

module.exports = {
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
};

module.exports = {
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
};

module.exports = {
    findByPk: async (id) => {
        try {
            return await Team.findAll({
                where: { id: id, status_id: 1 }
            })
                .then(async res => {
                    return res;
                })
        } catch (err) {
            console.log(err);
        }
    },
};