import React from "react";
import {useEffect} from "react"
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import {useDispatch, useSelector} from 'react-redux';





 



function Maps() {
  const geolocation = useSelector((store)=> store.geolocation);
  
  const containerStyle = {
    width: "100%",
    height: "500px",
  };

  const center = {
    lat: 44.9537,
    lng: -93.091301,
  };
  
  
  const marker = {
    lat:Number(geolocation.lat),
    lng: Number(geolocation.lng),
  };
  // const icon = {
//   url:"racket.png",
//   // anchor: new google.maps.Point(17, 46),

//   // scaledSize: new google.maps.Size(50, 50)
// }

// const scale = {
//   scale: 1.5
// }
  
  // const markers = [
  //   [
  //     44.945655,
  //     -93.12167319999999
  //   ]
  // ] // end markers array
  


  const { isLoaded } = useJsApiLoader({
    id: "c8acd79f4ac60dee",
    googleMapsApiKey: "AIzaSyCAIMhJjtNU1n983ZoVZVj9fgp9LyVxih8",
  });

  

  return isLoaded ? (
    
    <GoogleMap
    
      mapContainerStyle={containerStyle}
      center={center}
      zoom={12}
      clickable={true}
      // id={c8acd79f4ac60dee}
    >
      <Marker position={marker}
      // icon={icon}
      ></Marker>
      <></>
    </GoogleMap>

    
  ) : (
    <>LOADING</>
  );
  
}

export default React.memo(Maps);
