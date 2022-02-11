import React from "react";
import { Link } from "react-router-dom";
import "./TopResult.css";

const TopResult = ({ artists }) => {
  const topArtist = artists.map((artist, index) => {
    const { id, name, images } = artist;

    if (index === 0) {
      return (
        <Link to={`/artist/${id}`} className="top-result-link" key={index}>
          <div className="top-result">
            <img className="top-image" src={images[2].url} alt="artist-icon" />
            <div className="top-text">
              <h1>{name}</h1>
              <p>ARTIST</p>
            </div>
          </div>
        </Link>
      );
    } else return null;
  });

  return <div>{topArtist}</div>;
};

export default TopResult;
