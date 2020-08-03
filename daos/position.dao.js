const Position = require("../models/Position");

module.exports = {
    createRole: async (Position) => {
        try {
            return await Position.create({
                name: Position.name
            }).then(async res => {
                return res;
            })
        } catch (err) {
            console.log(err);
        }
    },
    updateRole: async (Position, position_id) => {
        try {
            return await Position.update(Position, {
                where: { id: position_id }
            }).then(async res => {
                return res;
            })
        } catch (err) {
            console.log(err);
        }
    },
    deleteRole: async (Position, id) => {
        try {
            return await Position.update(Position, {
                where: { id: id }
            }).then(async res => {
                return res;
            })
        } catch (err) {
            console.log(err);
        }
    },
    findAllRole: async () => {
        try {
            return await Position.findAll({
                attributes: ['id', 'name']
            }).then(async res => {
                return res;
            })
        } catch (err) {
            console.log(err);
        }
    },
    findByPk: async (id) => {
        try {
            return await Position.findAll({
                attributes: ['id', 'name'],
                where: { id: id }
            })
                .then(async res => {
                    return res;
                })
        } catch (err) {
            console.log(err);
        }
    },
};

