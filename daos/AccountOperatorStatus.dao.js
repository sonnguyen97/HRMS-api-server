const AccountOperatorStatus = require("../models/AccountOperatorStatus");

module.exports = {
    createAccountOperatorStatus: async (accstt) => {
        try {
            var checkStatusExisted = await AccountOperatorStatus.count({ where: { name: accstt.name } });
            if (checkStatusExisted == 0) {
                return await AccountOperatorStatus.create({ name: accstt.name })
                    .then(async res => { return res; })
            } else {
                return false;
            }
        } catch (err) {
            console.log(err);
        }
    },
    deleteAccountOpetatorStatus: async (id) =>{
        try {
            return await AccountOperatorStatus.destroy({where: {id: id}})
            .then(async res => {return res})
        } catch (err) {
            console.log(err);
        }
    },

    updateAccountOperatorStatus: async (accstt, id) =>{
        try {
            await AccountOperatorStatus.update(
                {name: accstt.name},
                {where: {id: id}}
            ).then(async res => {return res});
        } catch (err) {
            console.log(err);
        }
    },
    // findAllAcoutOperation: async () => {
    //     try {
    //         return await AccountOperatorStatus.findAll().then(async res => { return res });
    //     } catch (err) {
    //         console.log(err);
    //     }
    // },
}