import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useMediaQuery } from '@react-hook/media-query';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { StateContext } from './utils/StateProvider';
import Search from './Search';

const CardsIntroHome = () => {
  const [state] = useContext(StateContext);

  const { products: originalProducts } = state; // Guardamos la lista original de productos
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = isMobile ? 2 : 4;

  // Estado local para el término de búsqueda
  const [searchTerm, setSearchTerm] = useState('');

  // Función para manejar el cambio en el término de búsqueda
  const handleSearchChange = (value) => {
    setSearchTerm(value);
    setCurrentPage(1); // Reiniciar la página actual al cambiar el término de búsqueda
  };

  // Filtrar productos según el término de búsqueda
  const filteredProducts = originalProducts.filter(producto =>
    producto.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calcular el índice del primer y último producto de la página actual
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  // Calcular el número total de páginas
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  // Funciones para cambiar de página
  const goToPrevPage = () => setCurrentPage(prevPage => prevPage - 1);
  const goToNextPage = () => setCurrentPage(prevPage => prevPage + 1);

  return (
    <section className='cards_content'>
      <div className='cards_titles'>
        <p>Descubre nuestros</p>
        <h2>Espacios de trabajo</h2>
      </div>
      <Search handleSearch={handleSearchChange} />
      <section className='cards_display'>
        {currentProducts.map((producto, index) => (
          <div key={index} className="cards_container">
            <img src={producto.imagen} alt={producto.nombre} />
            <h2>{producto.nombre}</h2>
            <p>{producto.descripcion}</p>
            <div className='cards_btnContent'>
              <Link className='cards_btnReservar' to="">Reservar<FontAwesomeIcon icon={faArrowRight} /></Link>
              <Link className='cards_btnMore' to="detalle/1">Ver más</Link>
            </div>
          </div>
        ))}
      </section>
      <div className='cards_paginador-content'>
        <button className='cards_paginador-arrow' onClick={goToPrevPage} disabled={currentPage === 1}>
          <FontAwesomeIcon className='arrowLeft' icon={faAngleRight} />
        </button>
        <div className='cards_paginador-items'>
          {/* Renderizar botones para cada número de página */}
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              className='items'
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              disabled={currentPage === i + 1}
            >
              {i + 1}
            </button>
          ))}
        </div>
        <button
          className='cards_paginador-arrow'
          onClick={goToNextPage}
          disabled={indexOfLastProduct >= filteredProducts.length}
        >
          <FontAwesomeIcon icon={faAngleRight} />
        </button>
      </div>
    </section>
  );
}

export default CardsIntroHome;
