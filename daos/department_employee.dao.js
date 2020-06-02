const Department_Employee = require("../models/Department_Employee");

module.exports = {
    createDepartmentEmployee: async (employeeID, departmentID) => {
        try {
            employee.forEach(element => {
                Department_Employee.create({
                    department_id: departmentID,
                    employee_id: employeeID
                })
            })
        } catch (err) {
            console.log(err);
        }
    },
}