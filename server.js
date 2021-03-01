const express = require('express');
const morgan = require('morgan');
const { client, syncAndSeed } = require('./db/db');

const app = express();
const port = process.env.PORT || 4567;

const init = async () => {
  try {
    await client.connect();
    await syncAndSeed();
    console.log('connected to db');
    app.listen(port, () => console.log(`listening on port ${port}`));
  } catch (error) {
    console.log(error);
  }
};

init();
