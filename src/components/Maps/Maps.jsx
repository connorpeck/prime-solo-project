import React from 'react'
import { GoogleMap, useJsApiLoader, } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '500px'
  
};


const marker = {
 lat: 44.9537,
  lng:  -93.091301
}

const center = {
  lat: 44.9537,
  lng:  -93.091301
};

function Maps() {
  const { isLoaded } = useJsApiLoader({
    id: '28012bfa74f851d9',
    googleMapsApiKey: "AIzaSyBfq3NpI06FkLbrezLE42LwKtxP3yEQHFU"
  })

  


  return isLoaded ? (
    
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={12}
        marker={{lat: 44.9537,
          lng:  -93.091301}}
      >
        <></>
      </GoogleMap>
  ) : <></>
}

export default React.memo(Maps)