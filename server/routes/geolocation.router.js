const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
  // GET route code here
});

/**
 * POST route template
 */
router.post('/geolocation', (req, res) => {
  // POST route code here
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
