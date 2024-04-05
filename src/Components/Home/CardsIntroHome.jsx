// CardsIntroHome.jsx
import React, { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { useMediaQuery } from '@react-hook/media-query';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import Search from './Search';
import ButtonReservar from '../ButtonReservar';
import sendRequest from "../utils/SendRequest";

const CardsIntroHome = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = isMobile ? 2 : 4;
  const [salas, setSalas] = useState([]);

  // Estado local para el término de búsqueda y filtros de categorías
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState({
    multiple: false,
    personal: false,
    vip: false,
    pet: false,
  });
  useEffect(() => {
    listarSalas();
  }, []);

  const listarSalas = async () => {
    try {
      const response = await sendRequest("GET", "http://localhost:8081/sala/listar");
      setSalas(response);
    } catch (error) {
      console.error("Error al obtener las salas:", error);
    }
  };

  // Función para manejar el cambio en el término de búsqueda
  const handleSearchChange = (value) => {
    setSearchTerm(value);
    setCurrentPage(1); 
  };

  // Función para manejar el cambio en los filtros de categorías
  const handleCategoryChange = (categories) => {
    setSelectedCategories(categories);
    setCurrentPage(1); 
  };

  // Filtrar productos según el término de búsqueda y filtros de categorías
  const filteredProducts = salas.filter(sala => {
    const includesSearchTerm = sala.nombre.toLowerCase().includes(searchTerm.toLowerCase());

    // Si no hay categorías seleccionadas, mostrar todos los productos
    if (
      !selectedCategories.multiple &&
      !selectedCategories.personal &&
      !selectedCategories.vip &&
      !selectedCategories.pet
    ) {
      return includesSearchTerm;
    }
   
    return (
      includesSearchTerm &&
      ((selectedCategories.multiple && sala.tipoSala.nombre === 'Múltiple') ||
      (selectedCategories.personal && sala.tipoSala.nombre === 'Sala Personal') ||
      (selectedCategories.vip && sala.tipoSala.nombre === 'Vip') ||
      (selectedCategories.pet && sala.tipoSala.nombre === 'Pet Friendly'))
    );
  });

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
      <Search handleSearch={handleSearchChange} handleCategories={handleCategoryChange} />
      <div className='cards_titles'>
        <p>Descubre nuestros</p>
        <h2>Espacios de trabajo</h2>
        <p className='numberPages'>{currentProducts.length} de {filteredProducts.length} Productos Mostrados</p>
      </div>
      <section className='cards_display'>
        {currentProducts.map((sala, index) => (
          <div key={index} className="cards_container">
            {/* <img src={Object.values(sala.imagenes[0])[0]} alt={sala.nombre} /> */}
            <h2>{sala.nombre}</h2>
            <p>{sala.descripcion}</p>
            <div className='cards_btnContent'>
              <ButtonReservar/>
              <Link className='cards_btnMore' to={`detalle/${sala.id}`}>Ver más</Link>
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