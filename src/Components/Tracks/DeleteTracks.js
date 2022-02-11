import React, { useState, useEffect } from "react";
import axios from "axios";
import { useToken, SpotifyURL } from "../../utils";

const DeleteTracks = (props) => {
  const token = useToken();
  const [deleteTrack, setDeleteTrack] = useState([]);

  useEffect(() => {
    try {
      axios
        .delete(`${SpotifyURL}/me/tracks/${props.match.params.ids}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(({ data }) =>
          setDeleteTrack({
            deleteTrack: data,
          })
        );
    } catch (err) {
      console.log(err);
    }
  }, [token]);
};

export default DeleteTracks;
