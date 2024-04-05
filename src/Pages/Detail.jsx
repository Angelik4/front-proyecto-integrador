// Detail.jsx

import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import ButtonReservar from '../Components/ButtonReservar';
import sendRequest from '../Components/utils/SendRequest';
import "../css/Detalle.css"

const Detail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await sendRequest('GET', `http://localhost:8081/sala/busqueda/${id}`);
        console.log('Respuesta de la solicitud:', response); // Agregar console para ver la respuesta
        setProduct(response);
      } catch (error) {
        console.error('Error al obtener el producto:', error);
      }
    };

    fetchProduct();
  }, [id]);

  useEffect(() => {
    if (product) {
      const formattedImages = product.imagenes?.map((url) => ({
        original: url,
        thumbnail: url,
      }));
      setImages(formattedImages);
    }
  }, [product]);

  return (
    <div className="main-container">
      <Link to="/" className="btn_atras">
        <FontAwesomeIcon className="iconArrow" icon={faAngleRight} /> Atrás
      </Link>
      {product && (
        <div className="container-title">
          <h2>DESCUBRE NUESTROS</h2>
          <h3>{product.nombre}</h3>
          <div className="content-details">
            <div className="text-container">
              <h4>{product.tipoSala.nombre}</h4>
              <p>{product.descripcion}</p>
              <ButtonReservar salaId={product && product.id} /> {/* Pasar el ID de la sala como prop */}
            </div>
            <div>
              <ImageGallery
                items={images}
                showPlayButton={false}
                showNav={false}
                showBullets={true}
                thumbnailPosition="right"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Detail;
