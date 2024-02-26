import React from 'react'
import { Link } from 'react-router-dom';
import { useMediaQuery } from '@react-hook/media-query';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faArrowRight, faAngleRight} from '@fortawesome/free-solid-svg-icons';
import  { useState, useContext } from 'react';
import { StateContext } from './utils/StateProvider';

const CardsSpacePet = () => {
  const [state] = useContext(StateContext);
  const { products } = state;
  const isMobile = useMediaQuery('(max-width: 600px)');

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = isMobile ? 2 : 4;

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
    <section className='cards_content-pet'>
        <div className='cards_titles-pet'>
        <p>Descubre nuestros</p>
        <h2>Espacios Pet Friendly</h2>
      </div>
      


    </section>
  )
}

export default CardsSpacePet;