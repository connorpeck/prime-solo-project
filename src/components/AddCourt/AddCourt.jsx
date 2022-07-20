import React, { useState } from 'react';
import {useEffect} from "react"
import {useDispatch, useSelector} from 'react-redux';
import './AddCourt.css';





// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name Profile with the name for the new component.
function AddCourt() {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const store = useSelector((store) => store);
  const [address, setAddress] = useState('');
  const dispatch = useDispatch();
  // const profile = useSelector((store)=> store.profile);
  // const user = useSelector((store)=> store.user);
  const geolocation = useSelector((store)=> store.geolocation);

  // const [heading, setHeading] = useState('Profile');

  
  useEffect(() => {
    dispatch({type:'FETCH_LOCATION', payload: address });
  }, []);

  function gatherAddress () {
    dispatch({type:'SET_ADDRESS', payload: address });
console.log('set address', address);
  }

  

  return (

    <div>
<h1>Add A Court</h1>
<h2>Lat: {geolocation.lat}, Lng: {geolocation.lng}</h2>


<form>
  <input onChange={(event) => setAddress(event.target.value)} type="text" placeholder='Address' />
  <button onClick={gatherAddress}> Add Court</button>
</form>


   
      
      
  
    </div>
  );
}

export default AddCourt;
