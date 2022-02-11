import React, { useState, useEffect } from "react";
import axios from "axios";
import SideBar from "../SideBar/SideBar";
import PlaylistHeader from "./PlaylistHeader";
import TopNav from "../TopNav/TopNav";
import { useToken, SpotifyURL } from "../../utils";
import { Link } from "react-router-dom";
import "./PlaylistInfo.css";

const PlaylistInfo = (props) => {
  const [playlistInfo, setPlaylistInfo] = useState([]);
  const [header, setHeader] = useState([]);
  const [uriList, setUriList] = useState([]);
  const token = useToken();

  useEffect(() => {
    try {
      axios
        .get(`${SpotifyURL}/playlists/${props.match.params.id}/tracks`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(({ data }) => {
          setPlaylistInfo(data.items);
          const uris = data.items.reduce((acc, curr) => {
            acc.push(curr.track.uri);
            return acc;
          }, []);
          setUriList(uris);
        });
      axios
        .get(`${SpotifyURL}/playlists/${props.match.params.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(({ data }) => setHeader([data]));
    } catch (err) {
      console.log(err);
    }
  }, [token, props.match.params.id]);

  const headerMap = header.map(({ name, description, images, id}) => {
    return (
      <PlaylistHeader name={name} description={description} images={images} id={id} uriList={uriList}/>
    );
  });

  const play = async (position) => {
    try {
      const req = await axios.get(`${SpotifyURL}/me/player/devices`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      await axios.put(
        `${SpotifyURL}/me/player/play?device_id=${req.data.devices[0].id}`,
        {
          uris: uriList,
          offset: {
            position: +position,
          },
          position_ms: 0,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  const infoMap = playlistInfo.map((playlist, index) => {
    const duration = new Date(playlist.track.duration_ms);
    const dateAdded = new Date(playlist.added_at);
    const seconds = `${(duration.getSeconds() < 10 ? '0' : '')}${duration.getSeconds()}`;
    const { album, name, artists } = playlist.track;

    return (
      <div onClick={() => play(index)}  key={index} className="track-container">
        <p>{index + 1}</p>
        <div className="track-image-main">
          {album.images ? (
            <img
              src={album.images[2].url}
              className="list-album-cover"
              alt="album cover"
            />
          ) : null}
          <div className="track-main">
            <p>{name}</p>
            <Link to={`/artist/${artists[0].id}`} className="playlist-artist-name">
              <p>{artists[0].name}</p>
            </Link>
          </div>
        </div>
        <p className="list-album-name">{album.name}</p>
        <p>{`${dateAdded.getDay()} days ago`}</p>
        <p className="list-album-duration">{`${duration.getMinutes()} : ${seconds}`}</p>
      </div>
    );
  });

  return (
    <div>
      <TopNav />
      {headerMap}
      <div className="playlist-info">
        <div className="column-headers">
          <ul className="number-title">
            <li>#</li>
            <li>Title</li>
          </ul>
          <ul className="album-date-duration">
            <li>Album</li>
            <li id="playlist-date">Date Added</li>
            <li>Duration</li>
          </ul>
        </div>
        <SideBar />
        <div className="playlist">{infoMap}</div>
      </div>
    </div>
  );
};

export default PlaylistInfo;
