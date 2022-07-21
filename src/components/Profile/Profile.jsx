import React, { useState } from 'react';
import {useEffect} from "react"
import {useDispatch, useSelector} from 'react-redux';
import './Profile.css';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';





// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name Profile with the name for the new component.
function Profile() {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const store = useSelector((store) => store);
  const dispatch = useDispatch();
  const profile = useSelector((store)=> store.profile);
  const user = useSelector((store)=> store.user);
  const geolocation = useSelector((store)=> store.geolocation);


  // const [heading, setHeading] = useState('Profile');

  
  useEffect(() => {
    dispatch({ type: "FETCH_PROFILE" });
    console.log('PROFILE TEST', profile);
  }, []);

  

  return (

    <div>
<h1>Profile</h1>





<TableContainer>
   <Table className='center'>
  <TableHead> 
    <TableRow align='center'>
      First Name 
      <TableCell align='center'>{profile.first_name}</TableCell>
    </TableRow>
    <TableRow align='center'>
      Last Name 
      <TableCell align='center'>{profile.last_name}</TableCell>
    </TableRow>
    <TableRow align='center'>
      Bio
      <TableCell align='center'>{profile.bio}</TableCell>
    </TableRow>
    <TableRow align='center'>
      Hand
      <TableCell align='center'>{profile.hand}</TableCell>
    </TableRow>
    <TableRow align='center'>
      Game Type
      <TableCell align='center'>{profile.game_type}</TableCell>
    </TableRow>
    <TableRow align='center'>
      Gender
      <TableCell align='center'>{profile.gender}</TableCell>
    </TableRow>
  </TableHead>
     
   </Table>
   </TableContainer>
   
      
      
  
    </div>
  );
}

export default Profile;
