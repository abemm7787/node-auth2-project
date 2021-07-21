require("dotenv").config()


// npm i jsonwebtoken is to install the library for javascript

const server = require('./api/server.js');

const PORT = process.env.PORT || 1000;

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
