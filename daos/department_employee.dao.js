const Department_Employee = require("../models/Department_Employee");

module.exports = {
    createDepartmentEmployee: async(employee, department) => {
        try {
            employee.forEach(element => {
                Department_Employee.create({
                    department_id: department,
                    employee_id: element
                })
            })
        } catch(err) {
            console.log(err);
        }
    },
}