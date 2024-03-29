import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useDispatch, useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import './UserPage.css'
import Maps from '../Maps/Maps';

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const profile = useSelector( (store) => store.profile)
  const history = useHistory();


  useEffect(() => {
    dispatch({ type: "FETCH_PROFILE"});
    console.log('profile object', profile);
  }, []);
  
  return (
    <div className="container">
      <h2>Welcome, {profile.first_name}</h2>
      <LogOutButton className="btn" />
      
      
      
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
