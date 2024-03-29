const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const profileRouter = require('./routes/profile.router');
const geolocationRouter = require('./routes/geolocation.router');
const ratingRouter = require('./routes/rating.router');
const allPinsRouter = require('./routes/allPins.router');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/api/profile', profileRouter);
app.use('/api/allPins', allPinsRouter);
// app.use('/api/id', profileRouter);
app.use('/api/geolocation', geolocationRouter);
app.use('/api/geolocation/delete', geolocationRouter);
app.use('/api/rating', ratingRouter);

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5001;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
