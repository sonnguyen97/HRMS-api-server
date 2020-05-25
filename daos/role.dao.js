const Role = require("../models/Role");

module.exports = {
    createRole: async (role) => {
        try {
            return await Role.create({
                name: role.name
            }).then(async res => {
                return res;
            })
        } catch (err) {
            console.log(err);
        }
    },
    updateRole: async (role, role_id) => {
        try {
            return await Role.update(role, {
                where: { id: role_id }
            }).then(async res => {
                return res;
            })
        } catch (err) {
            console.log(err);
        }
    },
    deleteRole: async (role, id) => {
        try {
            return await Role.update(role, {
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
            return await Role.findAll().then(async res => {
                return res;
            })
        } catch (err) {
            console.log(err);
        }
    },
    findByPk: async (id) => {
        try {
            return await Role.findAll({
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

