import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import './LoginForm.css';
// import LoginIcon from '@mui/icons-material/Login';
import Button from "@mui/material/Button";
import SportsTennisIcon from "@mui/icons-material/SportsTennis";
import TextField from '@mui/material/TextField';


function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const login = (event) => {
    event.preventDefault();

    if (username && password) {
      dispatch({
        type: "LOGIN",
        payload: {
          username: username,
          password: password,
        },
      });
    } else {
      dispatch({ type: "LOGIN_INPUT_ERROR" });
    }
  }; // end login

  return (
    
    <form>
      <h2>Login</h2>
      {errors.loginMessage && (
        <h3 className="alert" role="alert">
          {errors.loginMessage}=
        </h3>
      )}
      <div>
          <TextField
          variant="standard"
          id="standard-basic"
            type="text"
            label="Username"
            required
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
      </div>
      <div>
          <TextField
          variant="standard"
          id="standard-basic"
            type="text"
            label="Password"
            type="password"
            name="password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
      </div>
      <div>
        <br />
        <br />
        <Button
          onClick={login}
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
    </form>
  );
}

export default LoginForm;
