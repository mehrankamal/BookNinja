const keys = require("./config/keys");

const Pool = require("pg").Pool;

const pool = new Pool({
  user: keys.DB_USER,
  password: keys.DB_PASS,
  host: keys.DB_HOST,
  port: keys.DB_PORT,
});

module.exports = pool;
