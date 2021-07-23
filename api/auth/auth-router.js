const router = require("express").Router();
const { checkUsernameExists, validateRoleName , checkPasswordLength,} = require('./auth-middleware');
const { JWT_SECRET } = require("../secrets"); // use this secret!
const bcrypt = require("bcryptjs") // adding bycrupt which is hash
const User = require("../users/users-model")






router.post("/register", checkPasswordLength, checkPasswordLength, (req, res, next) => {

// we need to hash it before to added to the database, writing in plain english can be castrophic
// we will use bcrypt
const {username, password} = req.body
const hash = bcrypt.hashSync(password, 10) 

User.add({username, password: hash})
  .then(saved => {
    res.status(201).json(saved)
  })
  .catch(next)
  })
  /**
    [POST] /api/auth/register { "username": "anna", "password": "1234", "role_name": "angel" }

    response:
    status 201
    {
      "user"_id: 3,
      "username": "anna",
      "role_name": "angel"
    }
   */
// res.json({ message:"Hello there work now"})
// const {username, password} = req.nody

// const {role_name} = req // why does this not have a body?
// const hash = bcrypt.hashSync(password, 8) // make this tolerab

// User.add({ username, password: hash, role_name})
// .then(noidea => {
//   res.status(201).json(noidea)
// })
// .catch(next)


router.post("/login", checkUsernameExists, (req, res, next) => {
const {password} = req.body
if (bcrypt.compareSync(password, req.user.password)) {
res.json({ message: ` Welcome ${req.user.name} `})
  } 
  else{
    next({ status: 401, message: "invaild credentials"})
  }
})

// make it so the cooke is set on the client
  /**
    [POST] /api/auth/login { "username": "sue", "password": "1234" }

    response:
    status 200
    {
      "message": "sue is back!",
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ETC.ETC"
    }

    The token must expire in one day, and must provide the following information
    in its payload:

    {
      "subject"  : 1       // the user_id of the authenticated user
      "username" : "bob"   // the username of the authenticated user
      "role_name": "admin" // the role of the authenticated user
    }
   */




module.exports = router;
