import React from 'react'
import '../css/Home.css';
import Search from '../Components/Search';
import CardsIntroHome from '../Components/CardsIntroHome';

const Home = () => {
  return (
    <div>
      <div className='ct_banner-page'>
        <div className='ct_banner-title'>
          <h1>Conoce una manera de <br/> trabajar diferente</h1>
          <p>Lorem ipsum dolor sit amet consectetur. Eget tristique<br/> diam nam hendrerit sit urna augue.</p>
        </div>
        <Search/>
      </div>
      <CardsIntroHome/>
    </div>
  )
}

export default Home