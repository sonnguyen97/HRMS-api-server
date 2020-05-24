const Department = require("../models/Department");

module.exports = {
    createDepartment: async (department) => {

        try {
            return await Department.create({
                name: department.name,
                description: department.description,
                created_date: Date.now()
            }).then(async res => {
                return res;
            })
        } catch (err) {
            console.log(err);
        }
    },

};

// module.exports = {
//     getAllDepartment: async () => {
//         try {
//             return await Department.create({
//                 name: department.name,
//                 description: department.description,
//                 created_date: Date.now()
//             }).then(async res => {
//                 return res;
//             })
//         } catch (err) {
//             console.log(err);
//         }
//     },
// };