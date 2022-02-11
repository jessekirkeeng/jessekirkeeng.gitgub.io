import React, {useState, useEffect} from 'react';
import SideBar from '../SideBar/SideBar';
import TopNavLibrary from '../TopNav/TopNavLibrary';
import axios from 'axios';
import './Merch.css';

const MerchComponent = (props) => {

  const [ merch, setMerch ] = useState([]);

  useEffect(() => {
    axios.get('/api/merch')
    .then((res) => {
      setMerch(res.data)
    })
  }, []);



  const merchMap = merch.map((merch) => {
    return (
      <div className="merch-product-container">
        <img src={merch.imgurl} className='merch-img' />
        <div className='merch-name-price'>
        <div className='merch-product-name'>{merch.name}{merch.type}</div>
        <div className='merch-product-price'>{merch.price}</div>
        </div>
      </div>
    )
  })

	return (
    <div>
        <SideBar />
        <TopNavLibrary />
      <div className="merch-container">
      {merchMap}
      </div>
    </div>
  )
}

export default MerchComponent;