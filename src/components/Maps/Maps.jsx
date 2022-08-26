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



function Maps() {
  const profile = useSelector((store) => store.profile);
  const dispatch = useDispatch();
  const pins = useSelector((store) => store.pins);
  const [selected, setSelected] = useState(null);
  const [rating, setRating] = useState(null);
  const [review, setReview] = useState("");
  const [showReviewInput, setShowReviewInput] = useState(true);
  const [showRatingInput, setShowRatingInput] = useState(true);
  const history = useHistory();

  const toggleShowReview= () => {
    setShowReviewInput(!showReviewInput);
    console.log("in toggleShowReview");
  }; // end toggleShow


  const toggleShowRating= () => {
    setShowRatingInput(!showRatingInput);
    console.log("in toggleShowRating");
  }; // end toggleShow

  // const fetchPins = () => {
  //   dispatch({ type: "FETCH_PINS" });
  // }

  function addReview() {
    console.log("in add review", review);
    dispatch({ type: "SET_REVIEW", payload: selected.id, review });
    // history.push('/addCourt')
    // fetchPins();
  }

  function addRating() {
    console.log("in add rating", rating);
    dispatch({ type: "SET_RATING", payload: selected.id, rating });
    dispatch({ type: "FETCH_PINS" });
    history.push('/addCourt')

  }

  useEffect(() => {
    dispatch({ type: "FETCH_PINS" });
    console.log(pins);
  }, []);

  const containerStyle = {
    width: "100%",
    height: "500px",
  };

  const mapRef = useRef();
  const onMapLoad = (map) => {
    mapRef.current = map;
  };

  function deleteCourt() {
    console.log(selected.id);
    console.log("in deleteCourt");
    dispatch({ type: "DELETE_COURT", payload: selected.id });
  }

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
          {pins.map((marker) => (
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
                <h3>Court Added By: {profile.first_name} {profile.last_name} </h3>
                <div className="reviewForm">
                  <h2>Court Address: {selected.address}</h2>
                  <br />
                  <h2>
                    Review: {selected.review}
                    <br />
                    {showReviewInput ? (
                   <p></p>)
                    :
                    (
                      <input
                      onChange={(event) => setReview(event.target.value)}
                    ></input>
                    )}
                    <Button  sx={{ color:"#95ca84" }} onClick={addReview}>Update</Button>
                    <BorderColorIcon
                      onClick={toggleShowReview}
                      className="toggleReview"
                      sx={{ color: '#f0b800',
                  fontSize: 35}}
                    />
                  </h2>
                  <h2>
                    Rating: {selected.rating}
                    <br />
                    {showRatingInput ? (
                   <p></p>)
                   :
                    (<Select  onChange={(event) => setRating(event.target.value)}>
                      <MenuItem value="1">1</MenuItem>
                      <MenuItem value="2">2</MenuItem>
                      <MenuItem value="3">3</MenuItem>
                      <MenuItem value="4">4</MenuItem>
                      <MenuItem value="5">5</MenuItem>
                    </Select>
                    )}
                    <Button  sx={{ color:"#95ca84" }} onClick={addRating}>Update</Button>
                    <StarIcon   onClick={toggleShowRating} className="toggleRating" sx={{ color: '#f0b800',
                  fontSize: 35}}/>
                  </h2>
                </div>
                <div>
                  <Button
                    sx={{
                      borderRadius: 100,
                      background: '#95ca84',
                      hoverColor: 'white',
                      '&:hover': {
                        backgroundColor: '#638359',
                        color: 'white',
                    },
                    }}
                    endIcon={<DeleteIcon />}
                    variant="contained"
                    onClick={deleteCourt}
                  >
                    Delete
                  </Button>
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

export default React.memo(Maps);
