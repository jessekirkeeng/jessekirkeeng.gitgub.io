import React, { useState } from "react";
import axios from "axios";
import {
  MdOutlineArrowBackIosNew,
  MdOutlineArrowForwardIos,
} from "react-icons/md";
import { BsSearch } from "react-icons/bs";
import { useToken, SpotifyURL, useProfile } from "../../utils";
import SearchComponent from "../Search/Search";
import "./TopNav.css";

const TopNavSearchComponent = () => {
  const token = useToken();
  const user = useProfile();
  const [searchPlaylists, setSearchPlaylists] = useState([]);
  const [searchAlbum, setSearchAlbum] = useState([]);
  const [searchArtist, setSearchArtist] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const handleSearch = async () => {
    try {
      const req = await axios.get(
        `${SpotifyURL}/search?q=${searchInput}&type=artist%2Calbum%2Cplaylist`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            market: "US",
            limit: 5,
            offset: 0,
            include_external: "audio",
          },
        }
      );
      setSearchPlaylists(req.data.playlists.items);
      setSearchAlbum(req.data.albums.items);
      setSearchArtist(req.data.artists.items);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <nav className="top-nav">
        <div className="back-forward-arrows">
          <button className="arrow-btn">
            <MdOutlineArrowBackIosNew />
          </button>
          <button className="arrow-btn">
            <MdOutlineArrowForwardIos />
          </button>
        </div>
        <div className="search-input-container">
          <input
            className="search-input"
            type="text"
            placeholder="Artists, Songs, or Podcasts"
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <BsSearch onClick={handleSearch} 
          className="search-icon" />
        </div>
        <div className="user-name">
          <button className="user-btn">{user.display_name}</button>
        </div>
      </nav>
      <SearchComponent
        albums={searchAlbum}
        artists={searchArtist}
        playlists={searchPlaylists}
      />
    </div>
  );
};

export default TopNavSearchComponent;
