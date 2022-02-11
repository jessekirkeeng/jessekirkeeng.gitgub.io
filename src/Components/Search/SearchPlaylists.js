import React from "react";
import { Link } from "react-router-dom";
import "../Playlists/Playlists.css";
import "./Search.css";

const SearchPlaylists = ({ playlists, artist }) => {
  const playlistMap = playlists.map((list, index) => {
    if (index < 4) {
      return (
        <Link
          to={`/playlist/${list.id}`}
          key={list.id}
          className="playlist-preview"
        >
          <div>
            <img
              className="playlist-image"
              src={list.images[0].url}
              alt="playlist"
            />
            <h3>{list.name}</h3>
          </div>
        </Link>
      );
    } else return null;
  });

  const artistName = artist.map((artist, index) => {
    if (index === 0) {
      return <h2 className="featuring-text">Featuring {artist.name}</h2>;
    } else return null;
  });

  const artistMap = artist.map((artist, index) => {
    const { id, images, name } = artist;
    if (index < 4 && images.length) {
      return (
        <Link to={`/artist/${id}`} key={id} className="playlist-preview">
          <div>
            <img className="artist-image" src={images[0].url} alt="artist" />
            <h3>{name}</h3>
          </div>
        </Link>
      );
    }
  });

  return (
    <div>
      {artistName}
      <div className="featuring-section">{playlistMap}</div>
      <h2>Artists</h2>
      <div className="featuring-section">{artistMap}</div>
    </div>
  );
};

export default SearchPlaylists;
