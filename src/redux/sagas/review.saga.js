import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* updateReview (action) {
  try {
    
   const response = yield axios.put(`/api/geolocation/${action.payload}`);
   console.log('REVIEW SAGA RESPONSE', response.data);
  } catch (error) {
    console.log('err in update review');

  }
}

function* reviewSaga() {
  yield takeLatest('SET_REVIEW', updateReview);
}

export default reviewSaga;
