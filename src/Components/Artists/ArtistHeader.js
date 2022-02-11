import React from "react";
import "./ArtistPage.css";

const ArtistHeader = ({ name, images }) => {
  return (
    <header className="artist-page-header" >
      <img src={images[2].url} alt="artist icon" className="artist-icon" />
      <h1 className="artist-header-name">{name}</h1>
    </header>
  )
}

export default ArtistHeader;
