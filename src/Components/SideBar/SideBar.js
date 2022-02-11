import React from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import { useToken, SpotifyURL, useProfile } from "../../utils";
import SideBarPlaylist from "./SideBarPlaylist";
import Logo from "../../images/Spotify_Logo_RGB_White.png";
import "./SideBar.css";

const SideBarComponent = () => {
  const token = useToken();
  const user = useProfile();
  const history = useHistory();

  const createPlaylist = () => {
    try {
      axios.post(
        `${SpotifyURL}/users/${user.id}/playlists`,
        {
          name: "New Playlist",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      history.go(0);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="side-bar">
      <div className="home-search-library-container">
        <Link to="/homepage">
          <img src={Logo} className="logo-side-bar" alt="Logo" />
        </Link>
        <Link to="/homepage">
          <button className="home-btn side-bar-btn">Home</button>
        </Link>
        <Link to="/search">
          <button className="search-btn side-bar-btn">Search</button>
        </Link>
        <Link to="/playlists">
          <button className="your-library-btn side-bar-btn">
            Your Library
          </button>
        </Link>
        <Link to="/merch">
          <button className="side-bar-btn">Merch</button>
        </Link>
      </div>
      <div className="playlist-liked-songs">
        <button
          className="create-playlist-btn side-bar-btn"
          onClick={createPlaylist}
        >
          Create Playlist
        </button>
        <Link to="/liked-songs">
          <button className="liked-songs-btn side-bar-btn">Liked Songs</button>
        </Link>
      </div>
      <SideBarPlaylist />
    </div>
  );
};

export default SideBarComponent;
