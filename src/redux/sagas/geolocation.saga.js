import { put, take, takeLatest } from 'redux-saga/effects';
import axios from 'axios';



function* fetchAndStoreGeoLocation(action){
  console.log('in fetchGeoLocation', action);
  try {
      const location = action.payload;
      const response = yield axios.get('https://maps.googleapis.com/maps/api/geocode/json',
       {params:{
           address: location,
           key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
      }}, action.payload );
      console.log('SET_LOCATION DATA IN geolocationSaga SAGA', 
      response.data.results[0].geometry.location,
      response.data.results[0].formatted_address);
      const newCourt = {
        latLng: response.data.results[0].geometry.location,
        formattedAddress:response.data.results[0].formatted_address
      }
    
      yield axios.post('/api/geolocation/geolocation', newCourt);
      yield put ({ type: 'ADD_LOCATION', payload: newCourt.latLng });
  } catch (err){
      console.log('errr in get location', err);
  }
} // end fetchGeoLocation

//fetch all geolocations (load all points from DB)
function* fetchAllGeolocations(action){
  console.log('in storeGeoLocation', action);
  try {
    //passes the geolocation info from payload to the server
    
  } 
  catch(error) {
    console.log('error saving geoLocation', error);
  }

} // end storeGeoLocation

function* geolocationSaga() {
  // yield takeLatest('FETCH_LOCATION', fetchGeoLocation);
  yield takeLatest('SET_ADDRESS', fetchAndStoreGeoLocation);
  yield takeLatest('STORE_ADDRESS', fetchAllGeolocations);
}

export default geolocationSaga;