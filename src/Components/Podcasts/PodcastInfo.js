import React, { useState, useEffect } from "react";
import axios from "axios";
import SideBar from "../SideBar/SideBar";
import TopNavLibrary from "../TopNav/TopNavLibrary";
import { useToken, SpotifyURL } from "../../utils";
import "./PodcastInfo.css";

const PodcastInfo = (props) => {
  const [podcastInfo, setPodcastInfo] = useState([]);
  const  [uriList, setUriList] = useState([]);
  const token = useToken();
  const [shows, setShows] = useState([]);

  useEffect(() => {
    try {
      axios.get(`${SpotifyURL}/shows/${props.match.params.id}/episodes`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(({data}) => {
        setPodcastInfo(data.items);
        const uris = data.items.reduce((acc, curr) => {
          acc.push(curr.uri);
          return acc;
        }, []);
        setUriList(uris);
      });
      axios.get(`${SpotifyURL}/shows/${props.match.params.id}?market=US`, {
        // params: {limit: 1, offset: 0 },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(({ data }) => setShows(data));
    } catch (err) {
      console.log(err);
    }
  }, [token, props.match.params.id]);

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

  const infoMap = podcastInfo.map((podcastInfo, index) => {
    const duration = new Date(podcastInfo.duration_ms);
    const dateAdded= new Date(podcastInfo.release_date_precision);
    const seconds = `${(duration.getSeconds() < 10 ? '0' : '')}${duration.getSeconds()}`;

    return (
      <div key={index} onClick={() => play(index)} className='podcast-info-container'>
        <div className='podcast-image-details'>
        <p>{index + 1}</p>
          <img  className='podcast-main-image' src={podcastInfo.images[1].url} alt='podcast cover image' />
          <div className='podcast-description'>
            <p className='podcast-name-of-show'>{podcastInfo.name}</p>
            <p className='podcast-description-info-page' dangerouslySetInnerHTML={{ __html: podcastInfo.html_description }} />
          <div className='date-added-duration'>
            <p>{duration.getMinutes() + ' min' + ' ' + duration.getSeconds() + ' sec'}</p>
          </div>
          </div>
        </div>
      </div>
    )
  }) 

  const showsMap = 
      (
        <div className="shows-preview-info-page" key={shows.id}>
          <img className='shows-image-info-page' src={shows.images?.[0].url} alt='shows' />
          <div className='podcast-publisher-info'>
            <p>PODCAST</p>
          <h3 className='show-name-info-page'>{shows.name}</h3>
          <h4 className='publisher-info-page'>{shows.publisher}</h4>
          </div>
        </div>
    );
  

  return (
    <div>
      <TopNavLibrary />
      <SideBar />
      <div className='podcast-info-header'>
        {showsMap}
      </div>
      <h3 className='all-episodes'>All Episodes</h3>
      <div className='podcast-info-container'>
        {infoMap}
      </div>
    </div>
  )

}

export default PodcastInfo;