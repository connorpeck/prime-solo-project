import React from "react";
import { Link } from "react-router-dom";
import LogOutButton from "../LogOutButton/LogOutButton";
import "./Nav.css";
import { useSelector } from "react-redux";
import AppBar from '@mui/material/AppBar';

function Nav() {
  const user = useSelector((store) => store.user);

  return (
    // <AppBar
    // >
    <div className="nav">
      
      <Link to="/home">
        <h2 className="nav-title">Tennis Tracker</h2>
      </Link>
      <div>
        {/* If no user is logged in, show these links */}
        {!user.id &&
          // If there's no user, show login/registration links
          ((
            <Link className="navLink" to="/login">
              Login / Register
            </Link>
          ),
          (
            <Link className="navLink" to="/allPins">
              Tennis Courts
            </Link>
          ))}

        {/* If a user is logged in, show these links */}
        {user.id && (
          <>
            <Link className="navLink" to="/user">
              Home
            </Link>

            <Link className="navLink" to="/maps">
              Maps
            </Link>
            <Link className="navLink" to="/profile/:id">
              Profile
            </Link>
            <Link className="navLink" to="/addCourt">
              Add Court
            </Link>

            <Link className="navLink" to="/info">
              Create Profile
            </Link>
            <LogOutButton className="navLink" />
          </>
        )}

        <Link className="navLink" to="/about">
          About
        </Link>
        
      </div>
    </div>
    // </AppBar>
  );
}

export default Nav;
