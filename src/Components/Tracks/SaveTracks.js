import React, { useState, useEffect } from "react";
import axios from "axios";
import { useToken, SpotifyURL } from "../../utils";

const SaveTracks = (props) => {
  const token = useToken();
  const [saveTracks, setSavedTrack] = useState([]);

  useEffect(() => {
    try {
      axios
        .put(`${SpotifyURL}/me/tracks/${props.match.params.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(({ data }) => setSavedTrack({ saveTracks: data }));
    } catch (err) {
      console.log(err);
    }
  }, [token]);
};

export default SaveTracks;
