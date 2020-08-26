const Department = require("../models/Department");
const Employee = require("../models/Employee");
const contants = require("../contants/contants");
module.exports = {
    createDepartment: async (department) => {
        try {
            return await Department.create({
                name: department.name,
                email : department.email,
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
            if(department.status_id === 2){
                var employee = await Employee.findAll({
                    attributes: ['id'],
                    where : {department_id : department_id}
                });
                if(employee.length === 0){
                    return await Department.update(department, {
                        where: { id: department_id }
                    }).then(async res => {
                        return {code : 200, status :"Department has been deleted!"};
                    })
                }else{
                    return {code : 1, status :"Department has employee!"}
                }
            }else{
                return await Department.update(department, {
                    where: { id: department_id }
                }).then(async res => {
                    return {code : 200, status :"Department has been deleted!"};
                })
            }
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
                attributes: ['id', 'name', 'description', 'created_date', 'modified_date', 'orgunits_path','email','status_id'],            }).then(async res => {
                return res;
            })
        } catch (err) {
            console.log(err);
        }
    },
    findByPk: async (id) => {
        try {
            return await Department.findAll({
                attributes: ['id', 'name', 'description', 'created_date', 'modified_date', 'orgunits_path','email','status_id'],
                where: { id: id , status_id: contants.EMPLOYEE_STATUS_ACTIVE}
            }).then(async res => {
                return res;
            })
        } catch (err) {
            console.log(err);
        }
    },

    getAllEmpByDep: async (id)=>{
        try {
            return await Employee.findAll({
                attributes: ['id', 'primary_email', 'first_name', 'last_name'],
                where: { department_id: id, status_id: contants.EMPLOYEE_STATUS_ACTIVE }
            }).then(async res => {
                return res;
            })
        } catch (err) {
            console.log(err);
        }
    }
};
