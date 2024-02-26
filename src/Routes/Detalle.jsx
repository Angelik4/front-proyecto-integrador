import React from 'react';
import '../css/Detalle.css';
import SearchPet from '../Components/SearchPet';
import CardsSpacePet from '../Components/CardsSpacePet';


const Detalle = () => {
    return (
      <div>
        <div className='ct_banner-page-space-pet'>
            <div className='ct_banner-content-pet'>
                <div className='ct_banner-title-pet'>
                    <h1>Conoce una manera de <br/> trabajar diferente</h1>
                    <p>Lorem ipsum dolor sit amet consectetur. Eget tristique<br/> diam nam hendrerit sit urna augue.</p>
                </div>
                <SearchPet/>
            </div>
        </div>
        <CardsSpacePet/>
      </div>
    )
  }


export default Detalle