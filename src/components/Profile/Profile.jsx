import React, { useState } from 'react';
import {useEffect} from "react"
import {useDispatch, useSelector} from 'react-redux';
import './Profile.css';



// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name Profile with the name for the new component.
function Profile() {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const store = useSelector((store) => store);
  const dispatch = useDispatch();
  const profile = useSelector((store)=> store.profile);
  const user = useSelector((store)=> store.user)
  // const [heading, setHeading] = useState('Profile');

  
  useEffect(() => {
    dispatch({ type: "FETCH_PROFILE" });
    console.log('PROFILE TEST', profile);
  }, []);

  

  return (

    <div>
<h1>Profile</h1>
   <table className='center'>
     <tr>First Name
       <td>{profile.first_name}</td>
     </tr>
     <tr>Last Name
       <td>{profile.last_name}</td>
     </tr>
     <tr>Bio
       <td>{profile.bio}</td>
     </tr>
     <tr>Hand
       <td>{profile.hand}</td>
     </tr>
     <tr>Game Type
       <td>{profile.game_type}</td>
     </tr>
     <tr>Gender
       <td>{profile.gender}</td>
     </tr>
     
   </table>
      
      
  
    </div>
  );
}

export default Profile;
