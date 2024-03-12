import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWifi, faWind, faMugSaucer, faGlassWater, faCookieBite, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import "../css/Detalle.css";
import ButtonReservar from "../Components/ButtonReservar";
import axios from "axios";

const Detail = () => {
  const {id} = useParams();
  const [product, setProduct] = useState(null);

useEffect(() => {
  axios.get(`http://localhost:4000/products/${id}`)
  .then(response => setProduct(response.data))
  .catch(error => console.log(error))
}, [id])
  
 const [images, setImages] = useState([]);
 
  useEffect(() => {
    if (product) {
      const formattedImages = product.galery?.map((url) => ({
        original: url,
        thumbnail: url,
      }));
      setImages(formattedImages);
    }
  }, [product]);  

  const iconMapping = {
    wifi: faWifi,
    'aire acondicionado': faWind,
    café: faMugSaucer,
    agua: faGlassWater,
    'snack free': faCookieBite,
  };

  function renderIcon(servicio) {
    const icon = iconMapping[servicio.toLowerCase()];
    return icon ? <FontAwesomeIcon className="icon-service" icon={icon} /> : null;
  }

  return (
   <>
   {
    product &&  <div className="main-container">
    <Link to="/" className="btn_atras">
     <FontAwesomeIcon className="iconArrow" icon={faAngleRight} /> Atrás
   </Link>
   <div className="container-title">
     <h2>DESCUBRE NUESTROS</h2>
     <h3>{product.nombre}</h3>
     <div className="content-details">
       <div className="text-container">
         <h4>{product.categoria}</h4>
         <p>{product.descripcion}</p>
         <ul>
           {product.servicios?.map((servicio, index) => (
             <li key={index}>
               {renderIcon(servicio)}{servicio}
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
 </div>
   }
   </>
  );
};

export default Detail;