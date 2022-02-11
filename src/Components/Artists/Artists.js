import React, { useState, useEffect } from "react";
import SideBar from "../SideBar/SideBar";
import { Link } from "react-router-dom";
import TopNavLibrary from "../TopNav/TopNavLibrary";
import axios from "axios";
import { useToken, SpotifyURL } from "../../utils";
import "./Artists.css";

const ArtistsComponent = () => {
  const [list, setList] = useState([]);
  const token = useToken();

  useEffect(() => {
    try {
      axios
        .get(`${SpotifyURL}/me/following?type=artist`, {
          params: { limit: 30, offset: 0 },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(({ data }) => setList(data.artists.items));
    } catch (err) {
      console.log(err);
    }
  }, [token]);

  const artistsMap = list.map((list) => {
    const { id, images, name } = list;
    return (
      <Link to={`/artist/${id}`} id="artist-link">
        <div key={id} className="following-artists">
          <img className="artist-image" src={images[2].url} alt="artist" />
          <div className="artist-info">
            <h3 className="artist-preview-name">{name}</h3>
            <p className="artist">Artist</p>
          </div>
        </div>
      </Link>
    );
  });

  return (
    <div className="artist-library-page">
      <div>
        <p className="artist-category">Artists</p>
        <div className="artist-container">{artistsMap}</div>
        <SideBar />
        <TopNavLibrary />
      </div>
    </div>
  );
};

export default ArtistsComponent;
