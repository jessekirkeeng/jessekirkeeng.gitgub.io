import React from "react";
import SideBar from "../SideBar/SideBar";
import TopResult from "./TopResult";
import SearchPlaylists from "./SearchPlaylists";
import SearchAlbums from "./SearchAlbums";
import Recommendations from "../Recommendations/Recommendations";
import "./Search.css";

const SearchComponent = ({ albums, artists, playlists }) => {
  return (
    <div>
      {artists.length ? (
        <div className="search-results">
          <h2>Top Result</h2>
          <TopResult artists={artists} />
          <SearchPlaylists playlists={playlists} artist={artists} />
          <SearchAlbums albums={albums} />
        </div>
      ) : (
        <Recommendations />
      )}
      <SideBar />
    </div>
  );
};

export default SearchComponent;
