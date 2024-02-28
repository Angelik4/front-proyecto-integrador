import { useParams } from "react-router-dom";
import { useContext } from "react";
import { StateContext } from '../Components/utils/StateProvider';
import ImageGallery from 'react-image-gallery';
import "../css/Detalle.css"


const Detail = () => {
  const [state] = useContext(StateContext);
  const { products } = state;
  const params = useParams();
  const detalle = products.find(detalle => detalle.id === parseInt(params.id));


  return (
    <div className="main-container">
      <div className="container-title">
        <h2>DESCUBRE NUESTROS</h2>
        <h3>{detalle?.nombre}</h3>
        <div className="text-container">
        <h4>{detalle?.categoria}</h4>
        <p>{detalle?.descripcion}</p>
        <p> <ul>{detalle?.servicios.map((servicio, index) => (
            <li key={index}>{servicio}</li>
            ))}
            </ul></p>
        </div>
      </div>
    </div>
  )
};

export default Detail;
