import React, { useEffect, useState } from "react";
import axios from "axios";
import { useToken, SpotifyURL, useProfile } from "../../utils";
import { BsFillPlayCircleFill, BsFillPauseCircleFill } from "react-icons/bs";
import "./PlaylistHeader.css";

const PlaylistHeader = ({ name, description, images, id, uriList }) => {
  const token = useToken();
  const user = useProfile();
  const [following, setFollowing] = useState([]);
  const [toggle, setToggle] = useState(true);

  useEffect(() => {
    try {
      axios
        .get(
          `${SpotifyURL}/playlists/${id}/followers/contains?ids=${user.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then(({ data }) => setFollowing(data));
    } catch (err) {
      console.log(err);
    }
  }, [token, id, user.id]);

  const follow = async () => {
    try {
      await axios.put(
        `${SpotifyURL}/playlists/${id}/followers`,
        {
          public: false,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      axios
        .get(
          `${SpotifyURL}/playlists/${id}/followers/contains?ids=${user.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then(({ data }) => setFollowing(data));
    } catch (err) {
      console.log(err);
    }
  };

  const unfollow = async () => {
    try {
      await axios.delete(`${SpotifyURL}/playlists/${id}/followers`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      axios
        .get(
          `${SpotifyURL}/playlists/${id}/followers/contains?ids=${user.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then(({ data }) => setFollowing(data));
    } catch (err) {
      console.log(err);
    }
  };

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
      setToggle(!toggle);
    } catch (err) {
      console.log(err);
    }
  };

  const pause = async () => {
    try {
      const req = await axios.get(`${SpotifyURL}/me/player/devices`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      await axios.put(
        `${SpotifyURL}/me/player/pause?device_id=${req.data.devices[0].id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setToggle(!toggle);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <header className="header-container">
      {images.length > 0 ? (
        <img src={images[0].url} className="header-img" alt="header" />
      ) : null}
      <div className="header-info">
        <p>Playlist</p>
        <h1 className="header-name">{name}</h1>
        <p
          className="header-description"
          dangerouslySetInnerHTML={{ __html: description }}
        />
      </div>
      <div className="playlist-functions">
        {toggle ? (
          <BsFillPlayCircleFill
            className="play-button"
            onClick={() => play(0)}
          />
        ) : (
          <BsFillPauseCircleFill
            className="play-button"
            onClick={() => pause()}
          />
        )}
        {following[0] ? (
          <button className="playlist-following-button" onClick={unfollow}>
            FOLLOWING
          </button>
        ) : (
          <button className="playlist-follow-button" onClick={follow}>
            FOLLOW
          </button>
        )}
      </div>
    </header>
  );
};

export default PlaylistHeader;
