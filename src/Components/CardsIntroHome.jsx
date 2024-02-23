import { Link } from 'react-router-dom';
import React from 'react';
import data from '../data.json';

const CardsIntroHome = () => {
  return (
    <section className='cards_content'>
      <div className='cards_titles'>
        <p >Descubre nuestros</p>
        <h2>Espacios de trabajo</h2>
      </div>
      <section className='cards_display'>
      {data.map((producto, index) => (
        <div key={index} className="cards_container">
          <img src={producto.imagen} alt={producto.nombre} />
          <h2>{producto.nombre}</h2>
          <p>{producto.descripcion}</p>
          <div>
            <Link to="">Reservar</Link>
            <Link to="">Ver más</Link>
          </div>
        </div>
      ))}
      </section>
    </section>
  )
}

export default CardsIntroHome