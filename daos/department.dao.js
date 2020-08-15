const Department = require("../models/Department");

module.exports = {
    createDepartment: async (department) => {
        try {
            return await Department.create({
                name: department.name,
                description: department.description,
                created_date: Date.now(),
                status_id: department.status_id
            }).then(async res => {
                return res;
            })
        } catch (err) {
            console.log(err);
        }
    },
    updateDepartment: async (department, department_id) => {
        try {
            return await Department.update(department, {
                where: { id: department_id }
            }).then(async res => {
                return res;
            })
        } catch (err) {
            console.log(err);
        }
    },
    deleteDepartment: async (department, id) => {
        try {
            return await Department.update(department, {
                where: { id: id }
            }).then(async res => {
                return res;
            })
        } catch (err) {
            console.log(err);
        }
    },
    findAllDepartment: async () => {
        try {
            return await Department.findAll({
                attributes: ['id', 'name', 'description', 'created_date', 'modified_date', 'orgunits_path','email'],
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
            return await Department.findAll({
                attributes: ['id', 'name', 'description', 'created_date', 'modified_date', 'orgunits_path','email'],
                where: { id: id, status_id: 1 }
            }).then(async res => {
                return res;
            })
        } catch (err) {
            console.log(err);
        }
    },
};
