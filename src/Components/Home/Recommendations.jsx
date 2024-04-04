import { Link } from "react-router-dom";
import React, { useState, useEffect} from 'react';
import sendRequest from "../utils/SendRequest";

const Recommendations = () => {
  const [salas, setSalas] = useState([]);
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
  return (
    <section className="recom_container">
      <h3>Recomendaciones</h3>
      <div className="recom_content-cards">
        {salas.slice(0, 3).map((sala, index) => (
          <div key={index} className="recom_cards">
                <img  src={Object.values(sala.imagenes[0])[0]} alt={sala.nombre} />
            <div className="recom_cards-text">
                <h2>{sala.nombre}</h2>
                <p>{sala.descripcion}</p>
                <Link className="recom_btnMore" to="">
                    Ver más
                </Link>
                <div className="recom_cards-points">
                    <p className="number">{sala.promedioCalificacion}</p>
                    <p className="text">{sala.promedioCalificacion >= 8 ? "Excelente" : "Bueno"}</p>
                </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Recommendations;
