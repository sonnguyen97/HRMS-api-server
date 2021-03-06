const express = require("express");
const router = express.Router();
const auth = require("../../../middlleware/auth.middleware");
const jwt = require("jsonwebtoken");
const config = require("config");
// const bcrypt = require('bcryptjs');
const { check, validationResult } = require("express-validator");
const Account = require("../../../models/Account");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const crypto = require('crypto');

/* ----- 
  @route  GET api/auth
  @desc   Test 
-----*/

router.get("/", auth, async (req, res) => {
  try {
    const account = await Account.findOne({
      where: {
        email: req.account.email
      },
      attributes: ["id", "email"]
    });
    res.json(account);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

/* ----- 
  @route  POST api/auth
  @desc   Authenticate user & get token
-----*/
router.post(
  "/login",
  async (req, res) => {
    const { email = '', username = '', password } = req.body;
    var passwordEncrypt = crypto.createHash('sha256').update(password).digest('base64');
    console.log(passwordEncrypt);

    try {
      console.log(req.body);
      let account = await Account.findOne({
        where: {
          email: email,
          password: passwordEncrypt
        }
      });

      if (!account) {
        return res
          .status(400)
          .json({
            isAuthenticated: false,
            message: "Username or password is incorrect"
          });
      }
      const payload = {
        account: {
          id: account.id
        }
      };
      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 36000000 },
        (err, token) => {
          if (err) {
            throw err;
          } else if (account.dataValues.two_fa_status === 1) {
            res.json({
              isAuthenticated: false,
              message: "Two FA Authentication",
              token
            });
          } else {
            res.json({
              isAuthenticated: true,
              message: "Login successful!",
              token
            });
          }
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
