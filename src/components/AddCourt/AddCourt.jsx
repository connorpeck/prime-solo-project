import React, { useState } from 'react';
import {useEffect} from "react"
import {useDispatch, useSelector} from 'react-redux';
import './AddCourt.css';
import Maps from '../Maps/Maps'
import Button from "@mui/material/Button";
import SportsTennisIcon from "@mui/icons-material/SportsTennis";
import TextField from '@mui/material/TextField';








// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name Profile with the name for the new component.
function AddCourt() {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const store = useSelector((store) => store);
  const profile = useSelector((store)=> store.profile);
  const pins = useSelector((store) => store.pins);
  const [address, setAddress] = useState('');

  const [markers, setMarkers]= useState([]);

  const dispatch = useDispatch();
  // const profile = useSelector((store)=> store.profile);
  // const user = useSelector((store)=> store.user);
  const geolocation = useSelector((store)=> store.geolocation);
  // const latlng = {
  //   lat:geolocation.lat,
  //   lng: geolocation.lng,
  //   address: address
  // }
  // const lat = geolocation.lat;
  // const lng = geolocation.lng;

  // const [heading, setHeading] = useState('Profile');

  
  useEffect(() => {
    dispatch({type:'FETCH_PINS'});
    dispatch({ type: "FETCH_PROFILE" });
    
  }, []);




  function storeAddress () {
    dispatch({type:'SET_ADDRESS', payload: address });
    // dispatch({type:'STORE_ADDRESS', payload: latlng})
//     console.log('store address geolocation', latlng);
// console.log('set address', address);


  }



  

  return (

    <div>
      <h1 className='tennisCourtListStyle'>{profile.first_name} {profile.last_name}'s Tennis Court List</h1>
      {/* <h2>{JSON.stringify(pin)}</h2> */}
    
      <div className='mapsDiv'>
      <Maps />
      </div>
      <br />
      <div className='addCourtDiv'>
{/*     */}
<h1 className='addCourtText'>Add Court</h1>
{/* <h2>Lat: {geolocation.lat}, Lng: {geolocation.lng}</h2> */}




<form className='addressForm'>
  <TextField sx={{ color: 'white' }}id="standard-basic" label="Address" variant="standard" onChange={(event) => setAddress(event.target.value)} type="text" placeholder='' />
  <Button
          onClick={storeAddress}
          variant="contained"
          sx={{
            borderRadius: 100,
            background: "#95ca84",
            hoverColor: "white",
            "&:hover": {
              backgroundColor: "#638359",
              color: "white",
            },
          }}
          startIcon={<SportsTennisIcon />}
          color="primary"
        >
        </Button>
</form></div>


   
      
      
  
    </div>
  );
}

export default AddCourt;
