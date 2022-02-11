import React, { useState, useEffect } from "react";
import SideBar from "../SideBar/SideBar";
import axios from "axios";
import { useToken, SpotifyURL } from "../../utils";
import { Link } from "react-router-dom";
import "./Recommendations.css";

const Recommendations = () => {
  const [genre, setGenre] = useState([]);
  const [info, setInfo] = useState([]);
  const [title, setTitle] = useState([]);
  const [meta, setMeta] = useState([]);
  const token = useToken();

  useEffect(() => {
    try {
      let promise1 = axios.get(`${SpotifyURL}/me/top/artists`, {
        params: { limit: 5 },
        headers: { Authorization: `Bearer ${token}` },
      });
      let promise2 = axios.get(
        `${SpotifyURL}/recommendations/available-genre-seeds`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      let promise3 = axios.get(`${SpotifyURL}/me/top/tracks`, {
        params: { limit: 5 },
        headers: { Authorization: `Bearer ${token}` },
      });
      Promise.all([promise1, promise2, promise3])
        .then((values) => {
          setInfo(values[0].data.items);
          setGenre(values[1].data.genres);
          setTitle(values[2].data.items);
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
    }
  }, [token]);

  useEffect(() => {
    if (info.length) {
      let artistSeeds = info.reduce((acc, curr) => {
        return (acc += `${curr.id},`);
      }, "");

      try {
        axios
          .get(`${SpotifyURL}/recommendations?seed_artists=${artistSeeds}`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then(({ data }) => setMeta(data.tracks));
      } catch (err) {
        console.log(err);
      }
    }
  }, [info]);

  // const recMap = info.map((seed, i) => {
  // 	return (
  // 		<div className='map' >
  // 			<section key={i}>
  // 				<h2 className="text">{seed.name}</h2>
  // 				<img
  // 					src={seed.images[1].url}
  // 					alt='artists'
  // 					className="img"
  // 				/>
  // 			</section>
  // 		</div>
  // 	);
  // });

  // const songMap = title.map((seed, i) => {

  // 	return (
  // 		<div className='map' >
  // 			<section key={i} >
  // 				<h2 className="text">
  // 					{seed.name}
  // 				</h2>
  // 				<img
  // 					src={seed.album.images[1].url}
  // 					alt='track'
  // 					className="img"
  // 				/>
  // 			</section>
  // 		</div>
  // 	);
  // });

  // const genreMap = genre.map((seed, i) => {
  // 	if (i < 6) {
  // 		return (
  // 			<section className="map">
  // 				<div key={i}>
  // 					<h2 className="text">
  // 						{seed}
  // 					</h2>
  // 				</div>
  // 			</section>
  // 		);
  // 	}
  // 	else return null;
  // });

  const list = meta.map((seed, i) => {
    return (
      <Link to={`/album/${seed.album.id}`} className="link">
        <section key={i} className="map">
          <div className="sugggested-songs-info">
            <h2 className="text">{seed.name}</h2>
            <img src={seed.album.images[1].url} className="img" alt="image" />
          </div>
        </section>
      </Link>
    );
  });

  return (
    <div className="render">
        <h1 className="render-text">Suggested Songs</h1>
      <div className="render-maps">

        {list}
      </div>
      {/* <h1 className="render-text">Top Artists</h1>
				<section className="render-maps">
					{recMap}
				</section>
			<h1 className="render-text">Sugessted Genres</h1>
				<section className="render-maps">
					{genreMap}
				</section>
			<h1 className="render-text">Top Songs</h1>
				<section className="render-maps">
					{songMap}
				</section> */}
      <SideBar />
    </div>
  );
};

export default Recommendations;
