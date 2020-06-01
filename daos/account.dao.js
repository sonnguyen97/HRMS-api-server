var CryptoJS = require("crypto-js");
const Account = require("../models/Account");
const Randomstring = require("randomstring");
const contants = require("../contants/contants");
const AccountStatus = require("../models/AccountOperatorStatus");

//create account
module.exports = {
  createAccount: async (acc) => {
    var passwordRandom = Randomstring.generate(6);
    var passwordEncrypt = CryptoJS.SHA256(passwordRandom);
    try {
      var checkAccountExisted = await Account.count({ where: { email: acc.email } });
      if (checkAccountExisted == 0) {
        return await Account.create({
          password: passwordEncrypt.toString(),
          email: acc.email,
          created_date: Date.now(),
          status_id: contants.ACCOUNT_STATUS_ACTIVE
        }).then(async res => {
          return res;
        })
      } else {
        return false;
      }
    } catch (err) {
      console.log(err);
    }
  },
  // update account
  updateAccount: async (acc) => {
    var passwordEncrypt = CryptoJS.SHA256(acc.password);
    console.log(passwordEncrypt);
    try {
      await Account.update(
        { password: passwordEncrypt.toString() },
        {
          where:
            { id: acc.id }
        }
      ).then(async res => {
        return res;
      })
    } catch (err) {
      console.log(err);
    }
  },
  getAccounts: async () => {
    try {
      return await Account.findAll(
        {
          include: [{
            model: AccountStatus,
            attributes: ['name']
            // where: id
          }],
          where: { status_id: contants.ACCOUNT_STATUS_ACTIVE } }
      ).then(async res => {
        return res;
      })
    } catch (err) {
      console.log(err);
    }
  },
  getAccountById: async (id) => {
    try {
      return await Account.findOne({
        where: { id: id, status_id: contants.ACCOUNT_STATUS_ACTIVE }
      }).then(async res => {
        return res;
      })
    } catch (err) {
      console.log(err);
    }
  },
  deactiveAccount: async (status_id) => {
    try {

      return await Account.update(
        {
          status_id: contants.ACCOUNT_STATUS_DEACTIVE
        },
        {
          where: { id: status_id }
        }
      ).then(async res => {
        return res;
      })
    }
    catch (err) {
      console.log(err);
    }
  }
};

