import { put, take, takeLatest } from 'redux-saga/effects';
import axios from 'axios';



function* convertAndStoreGeoLocation(action){
  console.log('in fetchGeoLocation', action);
  try {
      const location = action.payload;
      const response = yield axios.get('https://maps.googleapis.com/maps/api/geocode/json',
       {params:{
           address: location,
           key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
      }}, action.payload );
      console.log('SET_LOCATION DATA IN geolocationSaga SAGA', 
      response.data.results[0].address_components[0].long_name);
      const newCourt = {
        latLng: response.data.results[0].geometry.location,
        formattedAddress:response.data.results[0].formatted_address
      }
    console.log('NEW COURT OBJ', newCourt);
      yield axios.post('/api/geolocation/geolocation', newCourt);
      yield put ({ type: 'ADD_LOCATION', payload: newCourt.latLng });
  } catch (err){
      console.log('errr in get location', err);
  }
} // end fetchGeoLocation



function* fetchAllGeolocations(action){
  console.log('in fetchAllGeolocations', action);
  try {
      const response = yield axios.get('/api/geolocation' , action.payload );
      console.log('SET_PINS DATA IN SAGA', response.data );
      yield put ({ type: 'SET_PINS', payload: response.data });
      yield put ({ type: 'ADD_LOCATION', payload: response.data });
  } catch (err){
      console.log('errr in get all profile', err);
  }
}

function* deleteCourt(action){
  console.log('in delteCourt');
  try {
   yield axios.delete('/api/geolocation')
   .then(response => {
     console.log('DELETE COURT RES', response);
   })
  //  yield put({type:'FETCH_PINS'});

  } catch (err){
    console.log('error in delete court');
  }

}

function* geolocationSaga() {
  // yield takeLatest('FETCH_LOCATION', fetchGeoLocation);
  yield takeLatest('SET_ADDRESS', convertAndStoreGeoLocation);
  yield takeLatest('FETCH_PINS', fetchAllGeolocations);
  yield takeLatest('DELETE_COURT', deleteCourt);
}

export default geolocationSaga;


