import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useMediaQuery } from '@react-hook/media-query';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { StateContext } from './utils/StateProvider';
import Search from './Search';
import ButtonReservar from './ButtonReservar';

const CardsIntroHome = () => {
  const [state] = useContext(StateContext);

  const { products: originalProducts } = state; // Guardamos la lista original de productos
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = isMobile ? 2 : 4;
  const [clearCategories, setClearCategories] = useState(false);

  // Estado local para el término de búsqueda y categorías seleccionadas
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState({
    spaces: false,
    privates: false,
    vips: false,
    virtual: false,
  });

  // Función para manejar el cambio en el término de búsqueda y categorías seleccionadas
  const handleSearchChange = (value, categories) => {
    setSearchTerm(value);
    setSelectedCategories(categories);
    setCurrentPage(1); 
  };

  // Filtrar productos según el término de búsqueda y categorías seleccionadas
  const filteredProducts = originalProducts.filter(producto => {
    const includesSearchTerm = producto.nombre.toLowerCase().includes(searchTerm.toLowerCase());

    // Si no hay categorías seleccionadas, mostrar todos los productos
    if (
        !selectedCategories.spaces &&
        !selectedCategories.privates &&
        !selectedCategories.vips &&
        !selectedCategories.virtual
    ) {
        return includesSearchTerm;
    }

    return (
        includesSearchTerm &&
        ((selectedCategories.spaces && producto.categoria === 'spaces') ||
        (selectedCategories.privates && producto.categoria === 'privates') ||
        (selectedCategories.vips && producto.categoria === 'vips') ||
        (selectedCategories.virtual && producto.categoria === 'virtual'))
    );
  });

  // Calcular el índice del primer y último producto de la página actual
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  // Calcular el número total de páginas
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  // Cantidad total de productos en la lista
  const totalProductsCount = filteredProducts.length;

  // Funciones para cambiar de página
  const goToPrevPage = () => setCurrentPage(prevPage => prevPage - 1);
  const goToNextPage = () => setCurrentPage(prevPage => prevPage + 1);

  return (
    <section className='cards_content'>
      <Search handleSearch={handleSearchChange} clearCategories={clearCategories} setClearCategories={setClearCategories} />
      <div className='cards_titles'>
        <p>Descubre nuestros</p>
        <h2>Espacios de trabajo</h2>
      </div>
      <div className='ResultadosBusqueda'>
        <p>{currentProducts.length} de {totalProductsCount} productos mostrados</p>
      </div>
      <section className='cards_display'>
        {currentProducts.map((producto, index) => (
          <div key={index} className="cards_container">
            <img src={producto.imagen} alt={producto.nombre} />
            <h2>{producto.nombre}</h2>
            <p>{producto.descripcion}</p>
            <div className='cards_btnContent'>
              <ButtonReservar/>
              <Link className='cards_btnMore' to={`detalle/${producto.id}`}>Ver más</Link>
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
