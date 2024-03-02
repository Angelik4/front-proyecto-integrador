import { createContext, useReducer, useEffect } from "react";
import axios from "axios";

const StateContext = createContext();

const initialState = {
  products: [],
  loading: true,
  error: null
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_PRODUCTS':
      return {
        ...state,
        products: action.payload,
        loading: false,
        error: null
      };
    case 'SET_ERROR':
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
};

const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/products');
        dispatch({ type: 'UPDATE_PRODUCTS', payload: response.data });
      } catch (error) {
        dispatch({ type: 'SET_ERROR', payload: error.message });
      }
    };

    fetchData();
  }, []);

  return (
    <StateContext.Provider value={[state, dispatch]}>
      {children}
    </StateContext.Provider>
  );
};

export { StateContext };
export default StateProvider;