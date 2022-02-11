import React, { useEffect, useState } from "react";
import axios from "axios";
import { useToken, SpotifyURL } from "../../utils";
import { Link } from "react-router-dom";
import "./SideBar.css";

const SideBarPlaylist = () => {
  const [list, setList] = useState([]);
  const token = useToken();

  useEffect(() => {
    try {
      axios.get(`${SpotifyURL}/me/playlists`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then(({ data }) => setList(data.items))
    } catch (err) {
      console.log(err);
    }
  }, [token]);

  const listMap = list.map((list) => {
    const { id, name } = list;

    return (
      <div key={id}>
        <ul>
          <Link to={`/playlist/${id}`} className="playlist-titles">
            <li>{name}</li>
          </Link>
        </ul>
      </div>
    );
  });

  return (
    <div className="side-bar-list">
      {listMap}
    </div>
  )
};

export default SideBarPlaylist;
