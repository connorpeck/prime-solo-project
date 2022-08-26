import React, { useState } from "react";
import { useEffect, useRef } from "react";
import { useHistory } from 'react-router-dom';
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { useDispatch, useSelector } from "react-redux";
import ReviewForm from "../ReviewForm/ReviewForm";
import { useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import StarIcon from "@mui/icons-material/Star";
import DeleteIcon from "@mui/icons-material/Delete";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
// import { makeStyles } from "@mui/material";
// import { withTheme } from "@emotion/react";
// import {GoogleMapsReact} from 'google-map-react'
const center = {
  lat: 44.9537,
  lng: -93.091301,
};



function AllPinsMap() {
  const profile = useSelector((store) => store.profile);
  const dispatch = useDispatch();
  const allPins = useSelector((store) => store.allPins);
  const [selected, setSelected] = useState(null);
  const history = useHistory();
  useEffect(() => {
    dispatch({ type: "FETCH_ALL_PINS" });
    console.log(allPins);
  }, []);

  const containerStyle = {
    width: "100%",
    height: "500px",
  };



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
    // googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  return isLoaded ? (
    <div>
      <Paper elevation={6}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={12}
          minZoom={-3}
          options={{
            styles: customMapStyle,
          }}

        >
          {allPins.map((marker) => (
            <Marker
              onClick={() => {
                setSelected(null);
                setSelected(marker);
              }}
              position={{ lat: Number(marker.lat), lng: Number(marker.lng) }}
              icon={{
                url: "racket.png",
                // anchor: new google.maps.Point(17, 46),
                animation: google.maps.Animation.BOUNCE,
                scaledSize: new google.maps.Size(60, 60),
              }}
            ></Marker>
          ))}
          {selected ? (
            <InfoWindow
              position={{
                lat: Number(selected.lat),
                lng: Number(selected.lng),
              }}
              onCloseClick={() => {
                setSelected(null);
              }}
            >
              <div className="infoWindow">
                <div className="reviewForm">
                  <h2>Court Address: {selected.address}</h2>
                  <h2>
                    Review: {selected.review}
                    <br />
                  </h2>
                  <h2>
                    Rating: {selected.rating}
                    <br />
                  </h2>
                </div>
                <div>
                </div>
              </div>
            </InfoWindow>
          ) : null}
          <></>
        </GoogleMap>
      </Paper>
    </div>
  ) : (
    <>LOADING</>
  );
}

export default React.memo(AllPinsMap);
