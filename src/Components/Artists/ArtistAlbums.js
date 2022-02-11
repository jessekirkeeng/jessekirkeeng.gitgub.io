import React, { useState, useEffect } from "react";
import axios from "axios";
import { useToken, SpotifyURL } from "../../utils";
import { Link } from "react-router-dom";
import "./ArtistPage.css";

const ArtistAlbums = ({ id }) => {
  const token = useToken();
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    try {
      axios
        .get(`${SpotifyURL}/artists/${id}/albums`, {
          params: {
            limit: 5,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(({ data }) => setAlbums(data.items));
    } catch (err) {
      console.log(err);
    }
  }, [token, id]);

  const artistAlbums = albums.map((album, index) => {
    const { id, images, name } = album;
    const releaseYear = album.release_date.slice(0, 4);

    return (
      <Link to={`/album/${id}`} className="artist-album-container">
        <div key={index}>
          <img
            src={images[1].url}
            alt="album art"
            className="artist-album-image"
          />
          <h3 className="artist-album-name">{name}</h3>
          <p>{releaseYear} * Album</p>
        </div>
      </Link>
    );
  });

  return (
    <div className="artist-albums">
      <h2>Albums</h2>
      <div className="artist-album-info">{artistAlbums}</div>
    </div>
  );
};

export default ArtistAlbums;
