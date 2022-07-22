import React, { useState } from "react";
import { useEffect } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  GoogleMapsReact,
  InfoWindow,
} from "@react-google-maps/api";
import { useDispatch, useSelector } from "react-redux";

// import {GoogleMapsReact} from 'google-map-react'

function Maps() {
  const geolocation = useSelector((store) => store.geolocation);
  const [selected, setSelected] = useState(null);

  const containerStyle = {
    width: "100%",
    height: "500px",
  };

  const center = {
    lat: 44.9537,
    lng: -93.091301,
  };

  // const marker = {
  //   lat:Number(geolocation.lat),
  //   lng: Number(geolocation.lng),
  // };

  // const animation = {
  //   animation: BOUNCE
  // }

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
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={12}

      // id={c8acd79f4ac60dee}
    >
      {geolocation.map((marker) => (
        <Marker onClick={()=>{setSelected(null);
          setSelected(marker);}}
        position={marker}></Marker>
      ))}
      {
        selected ? (
          <InfoWindow position={{lat:selected.lat, lng:selected.lng}} onCloseClick={()=>{setSelected(null)}}>
            <p>Test</p>
          </InfoWindow>
        )
        : null
      }
      <></>
    </GoogleMap>
  ) : (
    <>LOADING</>
  );
}

export default React.memo(Maps);
