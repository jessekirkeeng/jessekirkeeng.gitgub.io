import React, { useState, useEffect } from "react";
import axios from "axios";
import { useToken, SpotifyURL } from "../../utils";
import { Link } from "react-router-dom";
import SideBar from "../SideBar/SideBar";
import TopNavLibrary from "../TopNav/TopNavLibrary";

const Track = (props) => {
  const [track, setTrack] = useState([]);
  const token = useToken();

  useEffect(() => {
    try {
      axios
        .get(`${SpotifyURL}/tracks/${props.match.params.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setTrack(res.data));
    } catch (err) {
      console.log(err);
    }
  }, [token, props.match.params.id]);

  const item = track.map((track) => {
    return (
      <div key={track.id}>
        <Link to={`/playlist/${track.id}`}>
          <img className="image" src={track.pic} />
        </Link>
        <Link to={`/album/${track.id}`}>
          <h3 className="title">{track.title}</h3>
        </Link>
        <Link to={`/artists/${track.id}`}>
          <p>{track.artist}</p>
        </Link>
      </div>
    );
  });

  return (
    <div>
      <div>
        {item}
        <SideBar />
        <TopNavLibrary />
      </div>
    </div>
  );
};

export default Track;
