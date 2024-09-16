const express = require("express");
const app = express();
const env = require('dotenv').config()
const events = require("./routers/event.routes");
const users = require("./routers/user-routes");
const db = require("./config/db");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const passportSetup = require("./config/passport");


app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.use(express.static("node_modules"))
app.use(express.static("public"))
app.use(express.static("uploads"))

const secret = process.env.SECRET;
app.use(session({
  secret,
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 60000 * 15
  }
}))
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

app.get('*', (req, res, next) => {
  res.locals.user = req.user || null;
  next();
})


app.use("/events", events);
app.use("/users", users);


const port = process.env.PORT
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
})