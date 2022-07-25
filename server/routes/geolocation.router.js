const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
  console.log('req.query geolocation router', req.query);
  const query = `SELECT * FROM "geolocation"`;
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
  const review = req.body.review;
  const user_id = req.user.id;
  

  const queryText = `INSERT INTO "geolocation" (lat, lng, address, review, user_id)
  VALUES ($1, $2, $3, $4, $5)`;
  pool.query( queryText, [lat, lng, address,review, user_id])
  .then( () => res.sendStatus(201) )
  .catch((err) => {
    console.log('geolocation save failed', err);
    res.sendStatus(500);
  });
});

module.exports = router;

router.delete('/:id', (req, res) => {
  

  const queryText = `DELETE FROM "geolocation" WHERE id = $1;`;
  console.log(req.params.id);
  const value = [req.params.id]
  pool.query( queryText, value)
  .then( () => res.sendStatus(200) )
  .catch((err) => {
    console.log('court delete failed', err);
    res.sendStatus(500);
  });
});

router.put('/', (req, res)=>{
  console.log('update review', req.body);
  const queryText = `UPDATE "geolocation" SET review = 'TEST REVIEW UPDATE' WHERE user_id=$1;`;
  const values = [req.user.id]
  // const values = [req.body]
  pool.query(queryText, values)
  .then(() => res.sendStatus(200))
  .catch((err)=>{
    console.log('update review failed', err);
    res.sendStatus(500);
  })
})

module.exports = router;

