

import { put, take, takeLatest } from 'redux-saga/effects';
import axios from 'axios';





function* fetchAllPins(action){
  console.log('in fetchAllPins', action);
  try {
      const response = yield axios.get('/api/allPins' , action.payload );
      console.log('SET_ALL_PINS DATA IN SAGA', response.data );
      yield put ({ type: 'SET_ALL_PINS', payload: response.data });
  } catch (err){
      console.log('errr in get all profile', err);
  }
}







function* publicSaga() {
  yield takeLatest('FETCH_ALL_PINS', fetchAllPins);
}

export default publicSaga;
