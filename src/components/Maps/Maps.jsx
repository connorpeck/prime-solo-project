import React, { useState } from "react";
import { useEffect, useRef} from "react";
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
const center = {
  lat: 44.9537,
  lng: -93.091301
};

// const icon = {
//   url:"racket.png",
//   // anchor: new google.maps.Point(17, 46),

//   scaledSize: new google.maps.Size(60, 60)
// }

function Maps() {
  const geolocation = useSelector((store) => store.geolocation);
  const dispatch = useDispatch();
  const pins = useSelector((store) => store.pins);
  const [selected, setSelected] = useState(null);
  const [review, setReview] = useState('THIS IS THE TEST REVIEW');



  function addReview () {
    console.log('in add review', review);
    dispatch({type: 'SET_REVIEW', payload: selected.id, review});
    // dispatch({type: 'ADD_REVIEW', payload:review});
    // dispatch({type:'SET_REVIEW', payload:review})
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

  

  // const id = ["72d068a3c1025ca3"]

  const mapRef = useRef();
  const onMapLoad = (map) => {
    mapRef.current = map;
  }


  // const center = useEffect(()=> ({lat: 44.9537,
  //   lng: -93.091301}), []);/// trying to not recenter on pin click
  function deleteCourt() {
    console.log(selected.id);
    console.log("in deleteCourt");
    dispatch({ type: "DELETE_COURT", payload: selected.id });
  }
  
 

  // const scale = {
  //   scale: 1.5
  // }



const customMapStyle = [
    {
        featureType: "poi",
        elementType: "geometry",
        stylers: [
            {
                color: "#eeeeee",
            },
        ],
    },
    {
        featureType: "poi",
        elementType: "labels.text",
        stylers: [
            {
                visibility: "off",
            },
        ],
    },
    {
        featureType: "water",
        elementType: "geometry.fill",
        stylers: [
            {
                color: "#d1e7ff",
            },
        ],
    },
    {
      featureType: "landscape",
      elementType: "geometry.fill",
      stylers: [
          {
              color: "#c5e2cf",
          },
      ],
  },
  {
    featureType: "road.highway",
    elementType: "geometry.fill",
    stylers: [
        {
            color: "#feffa8",
        },
    ],
},
{
  featureType: "road.local",
  elementType: "geometry.fill",
  stylers: [
      {
          color: "#e0f000",
      },
  ],
},
{
  featureType: "road.local.drivable",
  elementType: "all",
  stylers: [
      {
        visibility: "off",
      },
  ],
},
{
  featureType: "road.arterial",
  elementType: "all",
  stylers: [
      {
        color: "#fff799",
      },
  ],
},
];
   

  const { isLoaded } = useJsApiLoader({
    id: "72d068a3c1025ca3",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  return isLoaded ? (
    <div>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={12}
        // onLoad={onMapLoad}
        minZoom={-3}
        options={{
            styles: customMapStyle,
        }}
        

        // id={c8acd79f4ac60dee}
      >
        {pins.map((marker) => (
          <Marker
            onClick={() => {
              setSelected(null);
              setSelected(marker);
            }}
            position={{ lat: Number(marker.lat), lng: Number(marker.lng) }}
            pan
            icon={{
              url:"racket.png",
              // anchor: new google.maps.Point(17, 46),
            
              scaledSize: new google.maps.Size(60, 60)}}

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
                  Review: {selected.review}<input onChange={(event) => setReview(event.target.value)}></input>
                  <button onClick={addReview}>Add Review</button>
                </h2>
                <h2>Rating: </h2>
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
