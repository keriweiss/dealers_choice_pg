const pg = require('pg');
const SQL = require('./seed');
const client = new pg.Client(
  process.env.DATABASE_URL || 'postgres://localhost/seating_chart'
);

const syncAndSeed = async () => {
  await client.query(SQL);
};

module.exports = { client, syncAndSeed };
