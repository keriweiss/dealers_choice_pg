const router = require('express').Router();
const { client } = require('../db/db');
const path = require('path');
const express = require('express');

router.use(express.json());

router.get('/tables', async (req, res, next) => {
  try {
    let data = await client.query('SELECT table_number, relation FROM tables');
    res.send(data.rows);
  } catch (err) {
    next(err);
  }
});

router.get('/guests', async (req, res, next) => {
  try {
    let data = await client.query('SELECT * FROM guests');
    res.send(data.rows);
  } catch (err) {
    next(err);
  }
});

router.get('/guests/:id', async (req, res, next) => {
  try {
    res.sendFile(path.join(__dirname, '../guest.html'));
  } catch (err) {
    next(err);
  }
});

router.post('/guests', async (req, res, next) => {
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

router.post('/tables', async (req, res, next) => {
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

router.delete('/guests/:id', async (req, res, next) => {
  try {
    console.log(req.params.id);
    await client.query(`DELETE FROM guests WHERE guests.id = ${req.params.id}`);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
