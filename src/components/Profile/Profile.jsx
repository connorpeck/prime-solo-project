import React, { useState } from 'react';
import {useSelector} from 'react-redux';
import ProfileForm from '../ProfileForm/ProfileForm';


// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name Profile with the name for the new component.
function Profile(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const store = useSelector((store) => store);
  const user = useSelector((store) => store.user);
  const [heading, setHeading] = useState('Functional Component');

  return (

    <div>
      <h2>{user.username}'s Profile</h2>
      <ProfileForm />
    </div>
  );
}

export default Profile;
