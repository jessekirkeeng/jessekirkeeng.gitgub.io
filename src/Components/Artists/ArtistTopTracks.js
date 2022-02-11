import React, { useEffect, useState } from "react";
import axios from "axios";
import { useToken, SpotifyURL } from "../../utils";
import { Link } from "react-router-dom";
import {
  BsFillPlayCircleFill,
  BsFillPauseCircleFill,
} from "react-icons/bs";
import "./ArtistPage.css";

const ArtistTopTracks = ({ id }) => {
  const token = useToken();
  const [tracks, setTracks] = useState([]);
  const [uriList, setUriList] = useState([]);
  const [toggle, setToggle] = useState(true);
  const [following, setFollowing] = useState([]);

  useEffect(() => {
    try {
      axios
        .get(`${SpotifyURL}/artists/${id}/top-tracks?market=US`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(({ data }) => {
          setTracks(data.tracks);
          const uris = data.tracks.reduce((acc, curr) => {
            acc.push(curr.uri);
            return acc;
          }, []);
          setUriList(uris);
        });
      axios
        .get(`${SpotifyURL}/me/following/contains?type=artist&ids=${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(({ data }) => setFollowing(data));
    } catch (err) {
      console.log(err);
    }
  }, [token, id]);

  const follow = async () => {
    try {
      await axios.put(
        `${SpotifyURL}/me/following?type=artist&ids=${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      axios.get(
        `${SpotifyURL}/me/following/contains?type=artist&ids=${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      ).then(({ data }) => setFollowing(data))
    } catch (err) {
      console.log(err);
    }
  };

  const unfollow = async () => {
    try {
      await axios.delete(`${SpotifyURL}/me/following?type=artist&ids=${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      axios.get(
        `${SpotifyURL}/me/following/contains?type=artist&ids=${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      ).then(({ data }) => setFollowing(data))
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

  const topTracks = tracks.map((track, index) => {
    const { album, name } = track;
    const duration = new Date(track.duration_ms);
    const seconds = `${(duration.getSeconds() < 10 ? '0' : '')}${duration.getSeconds()}`;
    
    if (index < 5) {
      return (
        <div onClick={() => play(index)} className="top-track">
          <div className="top-track-1">
            <p className="top-track-index" onClick={() => play(index)}>{index + 1}</p>
            <Link to={`/album/${album.id}`} className="link" key={index}>
              <img
                src={album.images[2].url}
                alt="album art"
                className="top-track-img"
              />
            </Link>
          </div>
          <p className="top-track-name">{name}</p>
          <p className="top-track-duration">{`${duration.getMinutes()} : ${seconds}`}</p>
        </div>
      );
    } else return null;
  });

  return (
    <div className="top-tracks-container">
      <div className="settings">
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
          <button className="following-button" onClick={unfollow}>
            FOLLOWING
          </button>
        ) : (
          <button className="follow-button" onClick={follow}>
            FOLLOW
          </button>
        )}
      </div>
      <h2>Popular</h2>
      {topTracks}
    </div>
  );
};

export default ArtistTopTracks;
