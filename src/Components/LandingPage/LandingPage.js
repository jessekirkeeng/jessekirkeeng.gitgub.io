import React from "react";
import "./LandingPage.css";
import Logo from "../../images/Spotify_Logo_RGB_White.png";

const LandingPageComponent = (props) => {
  const {
    REACT_APP_CLIENT_ID,
    REACT_APP_AUTHORIZE_URL,
    REACT_APP_REDIRECT_URL,
  } = process.env;

  const scopes = [
    "streaming",
    "user-read-private",
    "user-follow-read",
    "user-follow-modify",
    "user-library-read",
    "user-library-modify",
    "user-read-playback-state",
    "user-modify-playback-state",
    "user-read-currently-playing",
    "user-read-recently-played",
    "playlist-modify-private",
    "playlist-modify-public",
    "playlist-read-private",
    "playlist-read-collaborative",
    "user-top-read",
  ];

  const handleLogin = () => {
    window.location = `${REACT_APP_AUTHORIZE_URL}?client_id=${REACT_APP_CLIENT_ID}&response_type=code&redirect_uri=${REACT_APP_REDIRECT_URL}&scope=${scopes.join("%20")}&show_dialog=true`;
  };

  return (
    <div className="parent-div">
      <img src={Logo} alt="Logo" className="logo-landing-page" />
      <button className="landing-btn" onClick={handleLogin}>
        Connect to Spotify
      </button>
    </div>
  );
};

export default LandingPageComponent;
