const pg = require('pg');
const SQL = require('./seed');
const client = new pg.Client('postgres://localhost/seating_chart');

const syncAndSeed = async () => {
  await client.query(SQL);
};

module.exports = { client, syncAndSeed };
