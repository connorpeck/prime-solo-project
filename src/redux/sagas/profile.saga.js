import { put, take, takeLatest } from 'redux-saga/effects';
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

function* fetchProfile() {
  try {
    const response = yield axios.get('/api/profile');
    yield put({ type: 'GET_PROFILE', payload: response.data });
  } catch (error) {
    console.log('Profile get request failed', error);
  }
}

function* profileSaga() {
  yield takeLatest('CREATE_PROFILE', saveProfile);
  yield takeLatest('PROFILE', fetchProfile);
}

export default profileSaga;