import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";
import SportsTennisIcon from "@mui/icons-material/SportsTennis";

function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const registerUser = (event) => {
    event.preventDefault();

    dispatch({
      type: 'REGISTER',
      payload: {
        username: username,
        password: password,
      },
    });
  }; // end registerUser

  return (
    <form className="formPanel" onSubmit={registerUser}>
      <h2>Register User</h2>
      {errors.registrationMessage && (
        <h3 className="alert" role="alert">
          {errors.registrationMessage}
        </h3>
      )}
      <div>
     
          <TextField
           variant="standard"
           id="standard-basic"
           label="Username"
            type="text"
            name="username"
            value={username}
            required
            onChange={(event) => setUsername(event.target.value)}
          />
        
      </div>
      <div>
          <TextField
          variant="standard"
          id="standard-basic"
          label="Password"
            type="password"
            name="password"
            value={password}
            required
            onChange={(event) => setPassword(event.target.value)}
          />
          <br />
          <br />
          <br />
      <Button
          onClick={registerUser}
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
          Login
        </Button>
      </div>
      <div>
        
      </div>
    </form>
  );
}

export default RegisterForm;
