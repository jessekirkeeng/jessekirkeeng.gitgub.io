import React from 'react';
import { MdOutlineArrowBackIosNew } from 'react-icons/md';
import { MdOutlineArrowForwardIos } from 'react-icons/md';
import { useProfile } from "../../utils";
import { useHistory } from 'react-router-dom';
import './TopNav.css';

const TopNavComponent = (props) => {
  const user = useProfile();
  const history = useHistory();

  return (
    <div className="top-nav">
      <div className="back-forward-arrows">
        <button className="arrow-btn" onClick={history.goBack}><MdOutlineArrowBackIosNew/></button>
        <button className="arrow-btn"><MdOutlineArrowForwardIos/></button>
      </div>
      <div className="user-name">
        <button className='user-btn'>{user.display_name}</button>
      </div>
    </div>
  )
}

export default TopNavComponent;
