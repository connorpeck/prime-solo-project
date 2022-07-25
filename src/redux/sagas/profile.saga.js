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




function* fetchProfile(action){
  console.log('in fetchProfile');
  try {
      const response = yield axios.get('/api/profile' , action.payload );
      console.log('SET_PROFILE DATA IN SAGA', response.data );
      yield put ({ type: 'SET_PROFILE', payload: response.data });
  } catch (err){
      console.log('errr in get all profile', err);
  }
}



// function* sendId() {
//   try {
   

   
//   } catch (error) {
//     console.log('error with sending id', error);
//   }
// } //end saveprofile

function* profileSaga() {
  yield takeLatest('CREATE_PROFILE', saveProfile);
  yield takeLatest('FETCH_PROFILE', fetchProfile);
//   yield takeLatest('SEND_ID', sendId);
}

export default profileSaga;