import React from "react";
import "./TopNav.css";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { Link } from "react-router-dom";
import { useToken, useProfile } from "../../utils";

const TopNavLibraryComponent = (props) => {
  const user = useProfile();
  const token = useToken();

  return (
    <div className="top-nav">
      <div className="arrows-and-music-btns">
        <div className="back-forward-arrows">
          <button className="arrow-btn">
            <MdOutlineArrowBackIosNew />
          </button>
          <button className="arrow-btn">
            <MdOutlineArrowForwardIos />
          </button>
        </div>
        <div className="music-btn-container">
          <Link to="/playlists">
            <button className="music-btn">Playlists</button>
          </Link>
          <Link to="/podcasts">
            <button className="music-btn">Podcasts</button>
          </Link>
          <Link to="/artists">
            <button className="music-btn">Artists</button>
          </Link>
          <Link to="/albums">
            <button className="music-btn">Albums</button>
          </Link>
        </div>
        <div className="user-name">
          <button className="user-btn">{user.display_name}</button>
        </div>
      </div>
    </div>
  );
};

export default TopNavLibraryComponent;
