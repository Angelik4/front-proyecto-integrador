import { Link } from 'react-router-dom';
import data from '../data.json';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faArrowRight, faAngleRight} from '@fortawesome/free-solid-svg-icons';
import  { useState, useEffect } from 'react';
import { useMediaQuery } from '@react-hook/media-query';

const CardsIntroHome = () => {
  const isMobile = useMediaQuery('(max-width: 600px)'); // Detecta si la pantalla es móvil

  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = isMobile ? 2 : 4; // Muestra 2 productos por página en pantallas móviles

  useEffect(() => {
    // Simula la llamada a la API cargando los datos del archivo JSON local
    setProducts(data);
  }, []);

  // Calcular el índice del primer y último producto de la página actual
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  // Calcular el número total de páginas
  const totalPages = Math.ceil(products.length / productsPerPage);

  // Cambiar a la página anterior
  const goToPrevPage = () => {
    setCurrentPage(prevPage => prevPage - 1);
  };

  // Cambiar a la página siguiente
  const goToNextPage = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  return (
    <section className='cards_content'>
      <div className='cards_titles'>
        <p >Descubre nuestros</p>
        <h2>Espacios de trabajo</h2>
      </div>
      <section className='cards_display'>
      {currentProducts.map((producto, index) => (
        <div key={index} className="cards_container">
          <img src={producto.imagen} alt={producto.nombre} />
          <h2>{producto.nombre}</h2>
          <p>{producto.descripcion}</p>
          <div className='cards_btnContent'>
            <Link className='cards_btnReservar' to="">Reservar<FontAwesomeIcon icon={faArrowRight} /></Link>
            <Link className='cards_btnMore' to="">Ver más</Link>
          </div>
        </div>
      ))}
      </section>
      <div className='cards_paginador-content'>
        <button onClick={goToPrevPage} disabled={currentPage === 1}><FontAwesomeIcon className='arrowLeft' icon={faAngleRight} /></button>
          <div>
            Página {currentPage} de {totalPages}
          </div>
        <button onClick={goToNextPage} disabled={indexOfLastProduct >= products.length}><FontAwesomeIcon icon={faAngleRight} /></button>
      </div>
    </section>
  )
}

export default CardsIntroHome