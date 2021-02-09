const { Pool, Client } = require('pg');
const { DB_USER, DB_NAME, DB_PW } = require('../config.js');

module.exports = pool = new Pool({
  user: process.env.DB_USER || DB_USER,
  database: process.env.DB_NAME || DB_NAME,
  password: process.env.DB_PW || DB_PW
});

// connect to pool -> run query -> disconnect from pool immediately (explicitly defined)?
// default beh -> open connection for ~5-10 seconds