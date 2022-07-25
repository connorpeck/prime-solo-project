const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
  console.log('req.query geolocation router', req.query);
  const query = `SELECT (lat),(lng) FROM "geolocation"`;
  pool.query(query)
  .then(result => {
    console.log('asdfasdfas results', result.rows);
    res.send(result.rows);
  }).catch(err => {
    console.log('error get geolocations', err);
    res.sendStatus(500)
  })
  
});

/**
 * POST route template
 */
router.post('/geolocation', (req, res) => {
  const lat = req.body.latLng.lat;
  const lng = req.body.latLng.lng;
  const address= req.body.formattedAddress;
  

  const queryText = `INSERT INTO "geolocation" (lat, lng, address)
  VALUES ($1, $2, $3)`;
  pool.query( queryText, [lat, lng, address])
  .then( () => res.sendStatus(201) )
  .catch((err) => {
    console.log('geolocation save failed', err);
    res.sendStatus(500);
  });
});

module.exports = router;

router.delete('/', (req, res) => {
  

  const queryText = `DELETE FROM "geolocation" WHERE geolocation.id = 1`;
  pool.query( queryText)
  .then( () => res.sendStatus(200) )
  .catch((err) => {
    console.log('court delete failed', err);
    res.sendStatus(500);
  });
});

module.exports = router;

