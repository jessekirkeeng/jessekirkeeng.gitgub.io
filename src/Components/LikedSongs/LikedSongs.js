import React, { useState, useEffect } from "react";
import SideBar from "../SideBar/SideBar";
import TopNavLibrary from "../TopNav/TopNavLibrary";
import axios from "axios";
import { useToken, SpotifyURL } from "../../utils";
import { Link } from "react-router-dom";
import "./LikedSongs.css";

const LikedSongsComponent = () => {
  const token = useToken();
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    try {
      axios
        .get(`${SpotifyURL}/me/tracks`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => setUserList(res.data.items));
    } catch (err) {
      console.log(err);
    }
  }, [token]);



  const savedSongs = userList.map((song) => {
    const { album, name } = song.track;
    return (
      <Link to={`/album/${album.id}`}
        className="liked-link">
        <section className="saved-songs" key={song.id}>
          <img 
            src={song.track.album.images[1].url} 
            alt='song'
            className='liked-song-img'
            />
          <h1 className='liked-songs'>{song.track.name}</h1>
        </section>
      </Link>
    );
  });

  return (
    <div>
      <div className='liked-songs-render'>
        <p className="liked-songs-text">Liked Songs</p>
        <div className="main">{savedSongs}</div>
        <SideBar />
        <TopNavLibrary />
      </div>
    </div>
  );
};

export default LikedSongsComponent;
