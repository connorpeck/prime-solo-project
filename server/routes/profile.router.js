const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();



router.get('/:id', (req, res) => {
  console.log(req.user.id);
  console.log('req.query in PROFILE ROUTER',req.params);
  const query = `SELECT * FROM "profile" JOIN "user" AS u ON profile.user_id= u.id WHERE profile.user_id= $1`;
  const values = [req.user.id];
  pool.query(query, values)
  .then(result => {
    console.log('hgfkghfkghkhjglkjhb', result.rows);
    res.send(result.rows[0]);
  }).catch(err => {
    console.log('err get profiles', err);
    res.sendStatus(500)
  })
  // GET route code here
});

/**
 * POST route template
 */
router.post('/profile', (req, res) => {
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;
  const bio = req.body.bio;
  const hand = req.body.hand;
  const game_type = req.body.game_type;
  const gender = req.body.gender
  const user_id = req.body.user_id;

  const queryText = `INSERT INTO "profile" (first_name, last_name, bio, 
    hand, game_type, gender, user_id)
    VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id` ;
    pool.query( queryText, [first_name, last_name, bio, hand, game_type, gender, user_id])
    .then( () => res.sendStatus(201))
    .catch((err) => {
      console.log('profile save failed', err);
      res.sendStatus(500);
    });
  // POST route code here
});

module.exports = router;
