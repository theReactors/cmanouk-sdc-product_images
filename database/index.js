const { Pool, Client } = require('pg');
const { DB_USER, DB_NAME, DB_PW } = require('../config.js');

module.exports = pool = new Pool({
  user: DB_USER,
  database: DB_NAME,
  password: DB_PW
});

// connect to pool -> run query -> disconnect from pool immediately (explicitly defined)?
// default beh -> open connection for ~5-10 seconds