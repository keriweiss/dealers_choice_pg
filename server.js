const express = require('express');
const morgan = require('morgan');
const { client, syncAndSeed } = require('./db/db');
const path = require('path');

const app = express();
const port = process.env.PORT || 4567;

app.use('/dist', express.static(path.join(__dirname, './dist')));
app.use('/assets', express.static(path.join(__dirname, './assets')));
// app.use('/src', express.static(path.join(__dirname, './src')));
app.use(express.json());

app.get('/', async (req, res, next) => {
  try {
    res.sendFile(path.join(__dirname, 'index.html'));
  } catch (err) {
    next(err);
  }
});

app.get('/tables', async (req, res, next) => {
  try {
    let data = await client.query('SELECT table_number, relation FROM tables');
    res.send(data.rows);
  } catch (err) {
    next(err);
  }
});

app.get('/guests', async (req, res, next) => {
  try {
    let data = await client.query('SELECT * FROM guests');
    res.send(data.rows);
  } catch (err) {
    next(err);
  }
});

app.get('/guests/:id', async (req, res, next) => {
  try {
    // let data = await client.query(
    //   `SELECT * FROM guests WHERE guests.id = ${req.params.id}`
    // );
    // res.send(data.rows);
    res.sendFile(path.join(__dirname, 'guest.html'));
  } catch (err) {
    next(err);
  }
});

app.post('/guests', async (req, res, next) => {
  try {
    const { first_name, last_name, table_id, guest_of } = req.body;
    let guestOf;
    if (guest_of) {
      guestOf = (
        await client.query(
          `SELECT * FROM guests WHERE guests.first_name = '${guest_of}'`
        )
      ).rows[0].id;
    } else {
      guestOf = 'NULL';
    }
    const guestToCreate = await client.query(
      `INSERT INTO guests (first_name, last_name, table_id, guest_of) VALUES ('${first_name}', '${last_name}', '${table_id}', ${guestOf})`
    );
    res.send(guestToCreate);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

app.post('/tables', async (req, res, next) => {
  try {
    const { table_number, relation } = req.body;
    const tableToCreate = await client.query(
      `INSERT INTO tables (table_number, relation) VALUES (${table_number}, '${relation}')`
    );
    res.send(tableToCreate);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

app.delete('/guests/:id', async (req, res, next) => {
  try {
    console.log(req.params.id);
    await client.query(`DELETE FROM guests WHERE guests.id = ${req.params.id}`);
    res.sendStatus(204);
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
