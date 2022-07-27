const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();






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

