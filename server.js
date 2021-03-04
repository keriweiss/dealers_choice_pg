const express = require('express');
// const morgan = require('morgan');
const { client, syncAndSeed } = require('./db/db');
const path = require('path');
const router = require('./routes/routes');

const app = express();
const port = process.env.PORT || 4567;

app.use('/dist', express.static(path.join(__dirname, './dist')));
app.use('/assets', express.static(path.join(__dirname, './assets')));
app.use('/api', router);

app.get('/', async (req, res, next) => {
  try {
    res.sendFile(path.join(__dirname, 'index.html'));
  } catch (err) {
    next(err);
  }
});

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
