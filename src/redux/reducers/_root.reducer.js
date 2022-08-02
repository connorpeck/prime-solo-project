import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import profile from './profile.reducer';
import geolocation from './geolocation.reducer';
import address from './address.reducer';
import pins from './pin.reducer';
import id from './id.reducer';
import allPins from './allPins.reducer'
// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user, 
  profile,
  geolocation,
  address,
  pins,
  id,
  allPins

});

export default rootReducer;
