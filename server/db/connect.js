const Pool = require('pg').Pool;

const pool = new Pool({
  user: 'postgres',
  password: `${process.env.dataBasePass}`,
  host: 'localhost',
  port: 5432,
  database: 'bus_system',
});

module.exports = pool;
