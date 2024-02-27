import { useParams } from "react-router-dom";
import { useContext } from "react";
import { StateContext } from '../Components/utils/StateProvider';


const Detail = () => {
  const [state] = useContext(StateContext);
  const { products } = state;
  const params = useParams()
  const detalle = products.find(detalle => detalle.id === parseInt(params.id))
  return (
    <>
     <main>
      <h1>Detalle de cada persona</h1>
      <div className='container-table'>
      <h2>id {params.id}</h2>
      <table>
        <tbody>
          <tr>
            <td>Nombre:</td>
            <td>{detalle?.nombre}</td>
          </tr>
          <tr>
            <td>Email:</td>
            <td>{detalle?.imagen}</td>
          </tr>
          <tr>
            <td>Teléfono:</td>
            <td>{detalle?.descripcion}</td>
          </tr>
          <tr>
            <td>Sitio web:</td>
            <td>{detalle?.calificacion}</td>
          </tr>
        </tbody>
      </table>
      </div>
    </main>
    </>
  )
}

export default Detail