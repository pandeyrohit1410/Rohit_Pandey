import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [ads, setAds] = useState([]);
  const [show, setShow] = useState(false);
  const [companies, setCompanies] = useState([]);
  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const res = await axios.get('http://localhost:8080/api/getall');
        setCompanies(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAds();
  });

  const handleSearch = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/api/companies?q=${keyword}`);
      setAds(res.data);
      setShow(!show)
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <center>
        <h1>Mentor Students</h1>
      </center>
      <div className='container'>
        <input
          type="text"
          placeholder="Search...."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className='input'
        />
        <button onClick={handleSearch} className='button'>Search</button>
      </div>
      {<div className='data'>
        {show
          ? <div className='gridContainer'>
            {ads.map((ad) => (
              <div key={ad._id} className='dataContainer'>
                <p className='heading'>{ad.headline}</p>
                <img src={ad.imageUrl} alt={ad.headline} className='image' />
                <p className='text'>{ad.primaryText}</p>
                <p className='text'>{ad.description}</p>
                <button className='buttonDown'>{ad.CTA}</button>
              </div>
            ))}
          </div>
          : <div className='gridContainer'>
            {companies.map((com) => (
              <div key={com._id} className='dataContainer'>
                <p className='heading'>{com.headline}</p>
                <img src={com.imageUrl} alt={com.headline} className='image' />
                <p className='text'>{com.primaryText}</p>
                <p className='text'>{com.description}</p>
                <button className='buttonDown'>{com.CTA}</button>
              </div>
            ))}
          </div>
        }
      </div>}
    </div>
  );
}

export default App;
