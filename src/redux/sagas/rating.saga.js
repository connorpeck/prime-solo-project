import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';


function* updateRating (action) {
  try {
    
   const response = yield axios.put(`/api/rating/${action.payload}/${action.rating}`);
   console.log('RATING SAGA RESPONSE', response.data);
  } catch (error) {
    console.log('err in update rating');

  }
}

function* ratingSaga() {
  yield takeLatest('SET_RATING', updateRating)
}

export default ratingSaga;
