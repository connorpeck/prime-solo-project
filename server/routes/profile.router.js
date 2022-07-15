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
router.post('/profile', (req, res) => {
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;
  const bio = req.body.bio;
  const hand = req.body.hand;
  const game_type = req.body.game_type;
  const gender = req.body.gender;

  const queryText = `INSERT INTO "profile" (first_name, last_name, bio, 
    hand, game_type, gender )
    VALUES ($1, $2, $3, $4, $5, $6) RETURNING id` ;
    pool.query( queryText, [first_name, last_name, bio, hand, game_type, gender])
    .then( () => res.sendStatus(201))
    .catch((err) => {
      console.log('profile save failed', err);
      res.sendStatus(500);
    });
  // POST route code here
});

module.exports = router;
