import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import LandingPage from './Components/LandingPage/LandingPage';
import HomePage from './Components/HomePage/HomePage';
import Merch from './Components/Merch/Merch';
import LikedSongs from './Components/LikedSongs/LikedSongs';
import Artists from './Components/Artists/Artists';
import Albums from './Components/Albums/Albums';
import Playlists from './Components/Playlists/Playlists';
import PlaylistInfo from './Components/Playlists/PlaylistInfo';
import Podcasts from './Components/Podcasts/Podcasts';
import Tracks from './Components/Tracks/Tracks';
import Track from './Components/Tracks/Track';
import DeleteTracks from './Components/Tracks/DeleteTracks';
import SaveTracks from './Components/Tracks/SaveTracks';
import TopNavSearchComponent from './Components/TopNav/TopNavSearch';
import Recommendations from './Components/Recommendations/Recommendations';
import ArtistPage from './Components/Artists/ArtistPage';
import AlbumsInfo from './Components/Albums/AlbumsInfo';
import PodcastInfo from './Components/Podcasts/PodcastInfo';

export default (
  <BrowserRouter>
    <Route exact path='/' component={LandingPage} />
    <Route path='/homepage' component={HomePage} />
    <Route path='/merch' component={Merch} />
    <Route path='/search' component={TopNavSearchComponent} />
    <Route path='/liked-songs' component={LikedSongs} />
    <Route path='/artists' component={Artists} />
    <Route path='/artist/:id' component={ArtistPage} />
    <Route path='/albums' component={Albums} />
    <Route path='/album/:id' component={AlbumsInfo} />
    <Route path='/playlists' component={Playlists} />
    <Route path='/playlist/:id' component={PlaylistInfo} />
    <Route path='/podcasts' component={Podcasts} />
    <Route path='/podcast/:id' component={PodcastInfo} />
    <Route path='/tracks' component={Tracks}/>
    <Route path='/delete-track/:ids' component={DeleteTracks}/>
    <Route path='/tracks/:id' component={Track}/>
    <Route path='/save-track/:ids' component={SaveTracks}/>
    <Route path='/recommendations' component={Recommendations}/>
  </BrowserRouter>
);