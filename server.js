const express = require("express");
const bodyParser = require("body-parser");
var session = require("express-session");
const app = express();
const PORT = process.env.PORT || 3000;
const db = require("./config/db-connection");
var cors = require("cors");

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
app.use(
  cors({
    credentials: true,
    origin: true
  })
);
app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  session({
    secret: "123",
    resave: false,
    httpOnly: true,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 3600,
      secure: false
    }
  })
);
// swaggerDOC(app);
//db
db.authenticate()
  .then(() => console.log("db connected"))
  .catch(err => console.log("error: " + err));

// Account routes
app.get("/", (req, res) => {
  res.status(200).send("WHATABYTE: Food For Devs");
});
app.use("/api", require("./routers"));
