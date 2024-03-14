import axios from "axios";

const sendRequest = async (method, endpoint, data = null) => {
  try {
    let response;
    switch (method) {
      case "GET":
        response = await axios.get(endpoint);
        break;
      case "POST":
        response = await axios.post(endpoint, data, {
          headers: {
            'Access-Control-Allow-Headers': 'POST, Authorization, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Access-Control-Allow-Origin',
            'Content-Type': 'application/json',
        }
        });
        break;
      case "PUT":
        response = await axios.put(endpoint, data);
        break;
      case "DELETE":
        response = await axios.delete(endpoint);
        break;
      default:
        throw new Error("Método HTTP no válido");
    }
    return response.data; 
  } catch (error) {
    throw new Error(`Error al enviar la solicitud ${method} a ${endpoint}: ${error}`);
  }
};

export default sendRequest;
