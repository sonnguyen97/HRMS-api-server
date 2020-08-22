const Team = require("../models/Team");
const Employee = require("../models/Employee");
const Team_Employee = require("../models/Team_Employee");
const Position = require("../models/Position");
module.exports = {
    createTeam: async (team) => {
        try {
            return await Team.create({
                name: team.name,
                created_date: Date.now(),
                status_id: team.status_id,
                email: team.email
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
                attributes: ['id', 'name', 'description', 'created_date', 'modified_date', 'email'],
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
            return await Team.findOne({
                attributes: ['id', 'name', 'description', 'created_date', 'modified_date', 'email','status_id'],                
                include: [
                    {
                        attributes: ['employee_id', 'modified_date'],
                        model: Team_Employee,
                        include: [
                            {
                                attributes: ['id','first_name','last_name','primary_email','position_id'],
                                model: Employee,
                                include: [
                                    {
                                        model: Position,
                                        attributes: ['name'],
                                    }
                                ],
                            }
                        ],
                        as: 'members'
                    }],
                order: [['email', "ASC"]],
                where: { id: id }
                
            }).then(async res => {
                response.id = res.id;
                response.groupName = res.name;
                response.email = res.email;
                response.description = res.description;
                response.status_id = res.status_id;
                for(var i = 0 ;i < res.members.length; i++){
                    let item = {
                        id : Number,
                        primary_email: String,
                        emp_name: String,
                        position_id : Number,
                        position_name: String
                    };
                    var el = res.members[i];
                    item.id = el.employee.id;
                    item.primary_email = el.employee.primary_email;
                    item.emp_name = el.employee.last_name + el.employee.first_name;
                    item.position_id = el.employee.position_id;
                    item.position_name = el.employee.position.name;
                    response.members.push(item);
                }   
                return response;
            })

        } catch (err) {
            console.log(err);
        }
    },

    removeEmpOfTeam : async(delEmp)=>{
        try {
            return await Team_Employee.destroy({
                where: { 
                    employee_id : delEmp.empId,
                    team_id : delEmp.teamId
                }
            }).then(async res => {
                return res;
            })
            
        } catch (error) {
            console.log(err);
        }
    }
};

