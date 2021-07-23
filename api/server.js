const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const authRouter = require("./auth/auth-router")
const usersRouter = require("./users/users-router.js");
const session = require("express-session")
const knex = require("../data/db-config")
const Store = require("connect-session-knex")(session) // allow us to make decisions in the database






const server = express();

server.use(helmet()); // plenty of middlewares in one , we are plugging security middleware but can test i
server.use(express.json());
server.use(cors());


server.use(session({
  name: "chocolatechip",
  secret: "shh",
  saveUnintialize: false,
  resave:false, 
  store: new Store({
knex,
createTavle:true,
clearInterval: 1000 * 60 * 10,
tablename: "session",
  }),
  cookie: {
    maxAge:1000 * 60 * 10,
    secure: false,
    httpOnly: true ,
  }
}))

// inside cookie we need to use true wheather if the cookie needs to be change
// this will only be send if this https

//     httpOnly: wether the browser can read the cookie or not




server.use("/api/auth", authRouter);
server.use("/api/users", usersRouter);

server.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  });
});

module.exports = server;
