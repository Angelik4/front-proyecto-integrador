import { useContext } from "react";
import { StateContext } from "./utils/StateProvider";
import { Link } from "react-router-dom";

const Recommendations = () => {
  const [state] = useContext(StateContext);
  const { products } = state;
  return (
    <section className="recom_container">
      <h3>Recomendaciones</h3>
      <div className="recom_content-cards">
        {products.slice(0, 3).map((producto, index) => (
          <div key={index} className="recom_cards">
                <img  src={producto.imagen} alt={producto.nombre} />
            <div className="recom_cards-text">
                <h2>{producto.nombre}</h2>
                <p>{producto.descripcion}</p>
                <Link className="recom_btnMore" to="">
                    Ver más
                </Link>
                <div className="recom_cards-points">
                    <p className="number">{producto.calificacion}</p>
                    <p className="text">{producto.calificacion >= 8 ? "Excelente" : "Bueno"}</p>
                </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Recommendations;
