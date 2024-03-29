import axios from "axios";

const sendRequest = async (method, endpoint, data = null) => {
  try {
    let token = localStorage.getItem('token'); // Obtener el token del localStorage

    let config = {
      headers: {
        'Content-Type': 'application/json',
      }
    };

    // Si hay un token, agregarlo a los encabezados de la solicitud
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    let response;
    switch (method) {
      case "GET":
        response = await axios.get(endpoint, config);
        break;
      case "POST":
        response = await axios.post(endpoint, data, config);
        break;
      case "PUT":
        response = await axios.put(endpoint, data, config);
        break;
      case "PATCH": // Agregar el caso para el método PATCH
        response = await axios.patch(endpoint, data, config);
        break;
      case "DELETE":
        response = await axios.delete(endpoint, config);
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