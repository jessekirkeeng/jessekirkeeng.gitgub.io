import React, { useEffect, useState } from "react";
import { useToken, SpotifyURL } from "../../utils";
import axios from "axios";
import TopNav from "../TopNav/TopNav";
import SideBar from "../SideBar/SideBar";
import ArtistHeader from "./ArtistHeader";
import ArtistTopTracks from "./ArtistTopTracks";
import ArtistAlbums from "./ArtistAlbums";
import RelatedArtists from "./RelatedArtists";
import "./ArtistPage.css";

const ArtistPage = (props) => {
  const token = useToken();
  const [artist, setArtist] = useState([]);
  const { id } = props.match.params;

  useEffect(() => {
    try {
      axios
        .get(`${SpotifyURL}/artists/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(({ data }) => setArtist([data]));
      window.scrollTo(0, 0);
    } catch (err) {
      console.log(err);
    }
  }, [token, id]);

  const headerMap = artist.map(({ name, images }) => {
    return <ArtistHeader name={name} images={images} />;
  });

  return (
    <div className="artist-page">
      {headerMap}
      <ArtistTopTracks id={id} />
      <ArtistAlbums id={id} />
      <RelatedArtists id={id} />
      <TopNav />
      <SideBar />
    </div>
  );
};

export default ArtistPage;
