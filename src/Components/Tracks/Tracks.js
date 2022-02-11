import React, { useState, useEffect } from "react";
import axios from "axios";
import { useToken, SpotifyURL } from "../../utils";
import SideBar from "../SideBar/SideBar";
import TopNavLibrary from "../TopNav/TopNavLibrary";
import { Link } from "react-router-dom";

const Tracks = (props) => {
  const [tracks, setTracks] = useState([]);
  const token = useToken();

  useEffect(() => {
    try {
      axios
        .get(`${SpotifyURL}/tracks`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setTracks(res));
    } catch (err) {
      console.log(err);
    }
  }, [token]);

  let myTracks = tracks.map((song) => {
    return (
      <Link to={`/track/${song.id}`}>
        <section key={song.id}>
          <img src={song.track.album.images[2].url} />
          <h2>{song.track.name}</h2>
        </section>
      </Link>
    );
  });

  return (
    <div>
      <div>
        {myTracks}
        <SideBar />
        <TopNavLibrary />
      </div>
    </div>
  );
};

export default Tracks;
