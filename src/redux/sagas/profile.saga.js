import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// worker Saga: will be fired on "PROFILE" actions
function* saveProfile(action) {
  try {
    // passes the profile info from the payload to the server
    yield axios.post('/api/profile/profile', action.payload);
  } catch (error) {
    console.log('error with saving profile', error);
  }
} //end saveprofile

function* profileSaga() {
  yield takeLatest('PROFILE', saveProfile);
}

export default profileSaga;