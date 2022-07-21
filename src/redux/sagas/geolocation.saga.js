import { put, take, takeLatest } from 'redux-saga/effects';
import axios from 'axios';



function* fetchGeoLocation(action){
  console.log('in fetchGeoLocation', action);
  try {
      const location = action.payload;
      const response = yield axios.get('https://maps.googleapis.com/maps/api/geocode/json',
       {params:{
           address: location,
           key: 'AIzaSyBfq3NpI06FkLbrezLE42LwKtxP3yEQHFU'
      }}, action.payload );
      console.log('SET_LOCATION DATA IN geolocationSaga SAGA', 
      response.data.results[0].geometry.location,
      response.data.results[0].formatted_address);
      let latLng= response.data.results[0].geometry.location
      let formattedAddress = response.data.results[0].formatted_address
      
      yield put ({ type: 'SET_LOCATION', payload: latLng, formattedAddress });
  } catch (err){
      console.log('errr in get location', err);
  }
} // end fetchGeoLocation

function* storeGeoLocation(action){
  console.log('in storeGeoLocation', action);
  try {
    //passes the geolocation info from payload to the server
    yield axios.post('/api/geolocation/geolocation', action.payload);
  } 
  catch(error) {
    console.log('error saving geoLocation', error);
  }

} // end storeGeoLocation

function* geolocationSaga() {
  yield takeLatest('FETCH_LOCATION', fetchGeoLocation);
  yield takeLatest('SET_ADDRESS', fetchGeoLocation);
  yield takeLatest('STORE_ADDRESS', storeGeoLocation);
}

export default geolocationSaga;