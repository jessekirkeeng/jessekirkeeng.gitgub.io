import React, { useEffect, useState } from "react";
import SideBar from "../SideBar/SideBar";
import TopNav from "../TopNav/TopNav";
import axios from "axios";
import { useToken, SpotifyURL } from "../../utils";
import { Link } from "react-router-dom";
import "./HomePage.css";

const HomePageComponent = (props) => {
  const today = new Date();
  const token = useToken();
  const [playlist, setPlaylist] = useState([]);
  const [artists, setArtists] = useState([]);
  const [shows, setShows] = useState([]);
  const [recent, setRecent] = useState([]);

  const greeting = () => {
    if (today.getHours() <= 11) {
      return "Good morning";
    } else if (today.getHours() > 11 && today.getHours() < 17) {
      return "Good afternoon";
    } else {
      return "Good evening";
    }
  };

  useEffect(() => {
    try {
      axios
        .get(`${SpotifyURL}/me/playlists`, {
          params: { limit: 3, offset: 0 },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(({ data }) => setPlaylist(data.items));
      axios
        .get(`${SpotifyURL}/me/following?type=artist`, {
          params: { limit: 3, offset: 0 },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(({ data }) => setArtists(data.artists.items));
      axios
        .get(`${SpotifyURL}/me/shows`, {
          params: { limit: 4, offset: 0 },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(({ data }) => setShows(data.items));
      axios
        .get(`${SpotifyURL}/me/player/recently-played`, {
          params: { limit: 5, offset: 0 },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(({ data }) => setRecent(data.items));
    } catch (err) {
      console.log(err);
    }
  }, [token]);

  const playlistMap = playlist.map((playlist) => {
    return (
      <Link to={`/playlist/${playlist.id}`} className="playlist-link-home-page">
        <div key={playlist.id} className="home-page-playlist-preview">
          <img
            className="home-page-playlist-image"
            src={playlist.images[0].url}
            alt="playlist"
          />
          <h3 className="home-page-name">{playlist.name}</h3>
        </div>
      </Link>
    );
  });

  const showsMap = shows.map((shows) => {
    return (
      <Link
        to={`/podcast/${shows.show.id}`}
        className="playlist-link-home-page"
      >
        <div key={shows.show.id} className="home-page-shows">
          <img
            className="home-page-show-image"
            src={shows.show.images[1].url}
            alt="shows"
          />
          <h3 className="home-page-show-name">{shows.show.name}</h3>
        </div>
      </Link>
    );
  });

  const artistsMap = artists.map((artists) => {
    return (
      <Link to={`/artist/${artists.id}`} className="home-page-link">
        <div className="home-page-following-artists" key={artists.id}>
          <img className="home-page-artist-image" src={artists.images[2].url} />
          <div className="home-page-artist-info">
            <h3 className="home-page-name">{artists.name}</h3>
          </div>
        </div>
      </Link>
    );
  });

  const recentlyPlayed = recent.map((recent) => {
    const { id, images } = recent.track.album;

    return (
      <Link to={`/album/${id}`} className="home-page-shows link">
        <div>
          <img src={images[1].url} alt="album" className="recent-album-image" />
          <h3 className="recent-track-name">{recent.track.name}</h3>
        </div>
      </Link>
    );
  });

  return (
    <div className="home-page">
      <div className="home-page-greeting">{greeting()}</div>
      <div className="home-page-user-content">
        {playlistMap}
        {artistsMap}
      </div>
      <h3 className="category-home-page">Shows for you</h3>
      <div className="home-page-shows-container">{showsMap}</div>
      <div className="home-page-recent">
        <h3>Recently Played</h3>
        <div className="home-page-shows-container">{recentlyPlayed}</div>
      </div>
      <SideBar />
      <TopNav />
    </div>
  );
};

export default HomePageComponent;
