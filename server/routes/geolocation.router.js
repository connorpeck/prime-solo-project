const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
  console.log('req.query geolocation router', req.query);
  const query = `SELECT * FROM "geolocation" WHERE user_id=$1;`;
  const value =[req.user.id]
  pool.query(query, value)
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
  const review = 'No Current Review';
  const rating = 'No Current Rating';
  const user_id = req.user.id;
  

  const queryText = `INSERT INTO "geolocation" (lat, lng, address, review, rating, user_id)
  VALUES ($1, $2, $3, $4, $5, $6)`;
  pool.query( queryText, [lat, lng, address,review, rating, user_id])
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

router.put('/:id/:review', (req, res)=>{
  console.log('update review ROUTER PARAMS ID', req.params.id, 'update review ROUTER PARAMS review', req.params.review);
  const queryText = `UPDATE "geolocation" SET review = $1 WHERE user_id=$2 AND id=$3;`;
  const values = [req.params.review, req.user.id, req.params.id]
  // const values = [req.body]
  pool.query(queryText, values)
  .then(() => res.sendStatus(200))
  .catch((err)=>{
    console.log('update review failed', err);
    res.sendStatus(500);
  })
})

router.put('/:id/:rating', (req, res)=>{
  console.log('update rating ROUTER PARAMS ID', req.params.id, 'update rating ROUTER PARAMS rating', req.params.rating);
  const queryText = `UPDATE "geolocation" SET rating = $1 WHERE user_id=$2 AND id=$3;`;
  const values = [req.params.rating, req.user.id, req.params.id]
  // const values = [req.body]
  pool.query(queryText, values)
  .then(() => res.sendStatus(200))
  .catch((err)=>{
    console.log('update review failed', err);
    res.sendStatus(500);
  })
})

module.exports = router;

