import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWifi, faWind, faMugSaucer, faGlassWater, faCookieBite, faAngleRight} from "@fortawesome/free-solid-svg-icons";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import ButtonReservar from "../Components/ButtonReservar";
import sendRequest from "../Components/utils/SendRequest";
import "../css/Detalle.css";

const Detail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
   const [images, setImages] = useState([]); 

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await sendRequest(
          "GET",
          `http://localhost:8081/sala/busqueda/${id}`
        );
        console.log("Respuesta de la solicitud:", response); // Agregar console para ver la respuesta
        setProduct(response);
        console.log("imagenes:", response);
      } catch (error) {
        console.error("Error al obtener el producto:", error);
      }
    };

    fetchProduct();
  }, [id]);

  useEffect(() => {
    if (product) {
      const formattedImages = product.imagenes?.map((url, index) => ({
        original: Object.values(url)[0],
        thumbnail: Object.values(url)[0],
      }));
      console.log(formattedImages);
      setImages(formattedImages);
    }
  }, [product]); 
 
  const iconMapping = {
    wifi: faWifi,
    "aire acondicionado": faWind,
    cafeteria: faMugSaucer,
    proyector: faGlassWater,
    "guarderia infantil": faCookieBite,
    "guarderia de mascotas": faCookieBite,
  };
  function renderIcon(servicio) {
    const nombreServicio =
      typeof servicio === "object" ? Object.values(servicio)[0] : servicio;
    const icon = iconMapping[nombreServicio.toLowerCase()];
    return icon ? (
      <FontAwesomeIcon className="icon-service" icon={icon} />
    ) : (
      <></>
    );
  }

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
              <ul>
                {product.servicios?.map((servicio, index) => (
                  <li key={index}>
                    {renderIcon(Object.values(servicio)[0])}
                    {Object.values(servicio)[0]}
                  </li>
                ))}
              </ul>
              <ButtonReservar />
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