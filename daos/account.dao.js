const uuidv1 = require("uuid/v1");
var CryptoJS = require("crypto-js");
const Account = require("../models/Account");

module.exports = {
  createAccount: async (acc) => {
    var passwordEncrypt = CryptoJS.SHA256(acc.password);
    try {
     return await Account.create({
        id: uuidv1(),
        password: passwordEncrypt.toString(),
        email: acc.email,
        created_date: Date.now()
      }).then(async res =>{
        return res;
      })
    } catch (err) {
      console.log(err);
    }
  },

};
