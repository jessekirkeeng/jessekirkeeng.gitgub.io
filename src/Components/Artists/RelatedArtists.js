import React, { useState, useEffect} from "react";
import axios from "axios";
import { useToken, SpotifyURL } from "../../utils";
import { Link } from "react-router-dom";
import "./ArtistPage.css";

const RelatedArtists = ({ id }) => {
  const token = useToken();
  const [related, setRelated] = useState([]);

  useEffect(() => {
    try {
      axios.get(`${SpotifyURL}/artists/${id}/related-artists`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }).then(({ data }) => setRelated(data.artists))
    } catch (err) {
      console.log(err);
    }
  }, [token, id]);

  const relatedArtists = related.map((artist, index) => {
    if(index < 5) {
      return (
        <Link to={`/artist/${artist.id}`} className="artist-album-container">
          <div key={index}>
            <img src={artist.images[1].url} alt="artist icon" className="related-artist-image"/>
            <h3 className="artist-album-name">{artist.name}</h3>
          </div>
        </Link>
      )
    } else return null;
  })

  return (
    <div className="related-artists">
      <h2>Fans Also Like</h2>
      <div className="artist-album-info">{relatedArtists}</div>
    </div>
  )
}

export default RelatedArtists;
