import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

function ProfileForm() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [bio, setBio] = useState('');
  const [hand, setHand] = useState('');
  const [gameType, setGameType] = useState('');
  const [gender, setGender] = useState('');
  const errors = useSelector((store) => store.errors);
  const user = useSelector((store)=> store.user);
  const dispatch = useDispatch();
  const history = useHistory();
  

  const makeProfile = (event) => {
    event.preventDefault();

    dispatch({
      type: 'CREATE_PROFILE',
      payload: {
        first_name: firstName,
        last_name: lastName,
        bio: bio,
        hand: hand,
        game_type: gameType,
        gender: gender,
        user_id: user.id
      },
    });
    history.push('/home')
  }; // end makeProfile

  return (
    <div>
    <form className="formPanel" onSubmit={makeProfile}>
      <h2>Set Profile</h2>
      {errors.registrationMessage && (
        <h3 className="alert" role="alert">
          {errors.registrationMessage}
        </h3>
      )}
      <div>
        <label htmlFor="firstName">
          FirstName:
          <input
            type="text"
            name="firstName"
            value={firstName}
            required
            onChange={(event) => setFirstName(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="lastName">
          Last Name:
          <input
            type="text"
            name="lastName"
            value={lastName}
            required
            onChange={(event) => setLastName(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="bio">
          Bio:
          <input
            type="text"
            name="bio"
            value={bio}
            required
            onChange={(event) => setBio(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="bio">
        Dominant Hand:
          <input
            type="text"
            name="hand"
            value={hand}
            required
            onChange={(event) => setHand(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="gameType">
        Game Type:
          <input
            type="text"
            name="gameType"
            value={gameType}
            required
            onChange={(event) => setGameType(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="gender">
        Gender:
          <input
            type="text"
            name="gender"
            value={gender}
            required
            onChange={(event) => setGender(event.target.value)}
          />
        </label>
      </div>
      <div>
      <input className="btn" type="submit" name="submit" value="Save" />
      <input className="btn" type="submit" name="submit" value="Home" />
      </div>
      
    </form>
    
    </div>
  );
}

export default ProfileForm;
