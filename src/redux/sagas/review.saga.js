import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* updateReview (action) {
  try {
    
   yield axios.put('/api/geolocation', action.payload)
   .then(response => {
     console.log('update review RES', response);
   })
  } catch (error) {

  }
}

function* reviewSaga() {
  yield takeLatest('SET_REVIEW', updateReview);
}

export default reviewSaga;
