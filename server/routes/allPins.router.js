const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
  console.log('req.query geolocation router', req.query);
  const query = `SELECT * FROM "geolocation";`;
  pool.query(query)
  .then(result => {
    console.log(' RESULTS FROM ALL PINS', result.rows);
    res.send(result.rows);
  }).catch(err => {
    console.log('error get ALL PINS', err);
    res.sendStatus(500)
  })
  
});


module.exports = router;

