import React from "react";
import { Link } from "react-router-dom";
import "../Albums/Albums.css";
import "./Search.css";

const SearchAlbums = ({ albums }) => {
  const albumsMap = albums.map((album, index) => {
    if (index < 4) {
      return (
        <Link
          to={`/album/${album.id}`}
          key={album.id}
          className="playlist-preview"
        >
          <div>
            <img
              className="album-image"
              src={album.images[0].url}
              alt="album"
            />
            <h3 className="search-album-name">{album.name}</h3>
          </div>
        </Link>
      );
    }
  });

  return (
    <div>
      <h2>Albums</h2>
      <div className="featuring-section">{albumsMap}</div>
    </div>
  );
};

export default SearchAlbums;
