const uuidv1 = require("uuid/v1");
var CryptoJS = require("crypto-js");
const Account = require("../models/Account");
const Randomstring = require("randomstring");


//create account
module.exports = {
  createAccount: async (acc) => {
    var passwordRandom = Randomstring.generate(6);
    var passwordEncrypt = CryptoJS.SHA256(passwordRandom);
    try {
      var checkAccountExisted = await Account.count({where: {email: acc.email}});
      if(checkAccountExisted == 0){
        return await Account.create({
          password: passwordEncrypt.toString(),
          email: acc.email,
          created_date: Date.now(),
          role_id: acc.role_id,
          status_id: "1"
        }).then(async res =>{
          return res;
        })
      }else{
        return false;
      }
    } catch (err) {
      console.log(err);
    }
  },
};

//update account
// module.exports = {
//   updateAccount: async (acc) =>{
//     try {
//       Account.find({ where: {id: acc.id}})
//       .on('success',function(account){
//         if(account){
//           account.update({

//           })
//         }
//       })
//     } catch (err) {
//       console.log(err);
//     }
//   }
// }
