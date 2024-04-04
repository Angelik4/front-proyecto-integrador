import React from 'react'
import '../css/Home.css';
import Calendar from '../Components/Calendar';
import Search from '../Components/Home/Search';
/* import CardsIntroHome from '../Components/Home/CardsIntroHome';
import Recommendations from '../Components/Home/Recommendations'; */

const Home = () => {
  return (
    <div>
      <div className='ct_banner-page'>
        <div className='ct_banner-content'>
          <div className='ct_banner-title'>
            <h1>Conoce una manera de <br/> trabajar diferente</h1>
            <p>Lorem ipsum dolor sit amet consectetur</p>
            <Search/>
            {/* <Calendar/> */}
          </div>
        </div>
      </div>
    {/*   <CardsIntroHome/>
      <Recommendations/> */}
    </div>
  )
}

export default Home;