import React from 'react'
import '../css/Home.css';
import CardsIntroHome from '../Components/Home/CardsIntroHome';
import Recommendations from '../Components/Home/Recommendations'; 

const Home = () => {
  return (
    <div>
      <div className='ct_banner-page'>
        <div className='ct_banner-content'>
          <div className='ct_banner-title'>
            <h1>Conoce una manera de <br/> trabajar diferente</h1>
            <p>Lorem ipsum dolor sit amet consectetur</p>
          </div>
        </div>
      </div>
     <CardsIntroHome/>
     <Recommendations/> 
    </div>
  )
}

export default Home;