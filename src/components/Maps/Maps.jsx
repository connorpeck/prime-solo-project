import React, { useState } from "react";
import { useEffect } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { useDispatch, useSelector } from "react-redux";
import ReviewForm from "../ReviewForm/ReviewForm";
import { useParams } from "react-router-dom";

// import {GoogleMapsReact} from 'google-map-react'

function Maps() {
  const geolocation = useSelector((store) => store.geolocation);
  const dispatch = useDispatch();
  // const courtID = useParams();
  const pins = useSelector((store) => store.pins);
  const [selected, setSelected] = useState(null);
  const [review, setReview] = useState('test review state!');


  const reviewForm ={
    courtName: 'The Tennis Court Name',
    review: 'What a lovely court',
    rating: '5 Stars'
  }
  function addReview () {
    console.log('in add review');
    dispatch({type: 'SET_REVIEW', payload: selected.id});
    dispatch({type:'FETCH_PINS'})
  }

  useEffect(() => {
    dispatch({ type: "FETCH_PINS" });
    // dispatch({type:'UPDATE_COURT', payload: selected.id})
    console.log(pins);
    // console.log('COURT ID', courtID);
  }, []);

  const containerStyle = {
    width: "100%",
    height: "500px",
  };

  const center = {
    lat: 44.9537,
    lng: -93.091301
  };

  // const center = useEffect(()=> ({lat: 44.9537,
  //   lng: -93.091301}), []);/// trying to not recenter on pin click
  function deleteCourt() {
    console.log(selected.id);
    console.log("in deleteCourt");
    dispatch({ type: "DELETE_COURT", payload: selected.id });
  }
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
    <div>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={12}
        minZoom={-3}
        options={{disableAutoPan: true}}

        // id={c8acd79f4ac60dee}
      >
        {pins.map((marker) => (
          <Marker
            onClick={() => {
              setSelected(null);
              setSelected(marker);
            }}
            position={{ lat: Number(marker.lat), lng: Number(marker.lng) }}
            key={marker.id}
          ></Marker>
        ))}
        {selected ? (
          <InfoWindow
            position={{ lat: Number(selected.lat), lng: Number(selected.lng) }}
            onCloseClick={() => {
              setSelected(null);
            }}
          >
            <div>
              <p>Tennis Court Test</p>
              <div className="reviewForm">
                <h2>
                  Court Address: {selected.address}
                </h2>
                <h2>
                  Review: {selected.review}<input></input>
                  <button onClick={addReview}>Add Review</button>
                </h2>
                <h2>Rating: {reviewForm.rating}</h2>
              </div>
              <button onClick={deleteCourt}>Delete</button>
            </div>
          </InfoWindow>
        ) : null}
        <></>
      </GoogleMap>
    </div>
  ) : (
    <>LOADING</>
  );
}

export default React.memo(Maps);
