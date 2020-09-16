const jwt = require("jsonwebtoken");
const config = require("config");
const account = require("./../models/Account");
const crypto = require('crypto');

module.exports = async function (req, res, next) {
  try {
    var authorization = req.header("authorization");
    var method = authorization.split(" ")[0];
    var token = authorization.split(" ")[1];
    switch (method) {
      case "Basic":
        var buf = new Buffer(token, 'base64').toString('ascii'); // Ta-da

        var email = buf.split(":")[0];
        var password = buf.split(":")[1];
        var passwordEncrypt = crypto.createHash('sha256').update(password).digest('base64');
        const status = await account.findOne({
          where: {
            email: email,
            password: passwordEncrypt
          }
        });
        if (status != null) {
          next();
        } else {
          res.status(401).json({ "isAuthenticated": false, message: "Username or password is invalid!" });
        }
        break;
      case "Bearer":
        const decoded = jwt.verify(token, config.get("jwtSecret"));
        req.account = decoded.account;
        next();
        break;
      default:
        return res.status(401).json({ "isAuthenticated": false, message: "No authentication in provided" });
    }

  } catch (error) {
    res.status(401).json({ "isAuthenticated": false, message: "Token is not valid" });
  }
};
