const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "masterpass",
    host: "bookninjadb.cdgsuhli9azb.us-east-1.rds.amazonaws.com",
    port: 5432
});

module.exports = pool;