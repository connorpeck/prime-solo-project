import { put, take, takeLatest } from 'redux-saga/effects';
import axios from 'axios';



function* fetchGeoLocation(action){
  console.log('in fetchGeoLocation', action);
  try {
      const location = '823 Hamline Ave N';
      const response = yield axios.get('https://maps.googleapis.com/maps/api/geocode/json',
       {params:{
           address: location,
           key: 'AIzaSyBfq3NpI06FkLbrezLE42LwKtxP3yEQHFU'
      }}, action.payload );
      console.log('SET_LOCATION DATA IN geolocationSaga SAGA', 
      response.data.results[0].geometry.location);
      let latLng= response.data.results[0].geometry.location
      
      yield put ({ type: 'SET_LOCATION', payload: latLng});
  } catch (err){
      console.log('errr in get location', err);
  }
}

function* geolocationSaga() {
  yield takeLatest('FETCH_LOCATION', fetchGeoLocation);
}

export default geolocationSaga;