import { createContext, useReducer } from "react";
import data from "./data.json"; 

const StateContext = createContext();

const initialState = {
  products: data, 
  loading: false, 
  error: null
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_PRODUCTS':
      return {
        ...state,
        products: action.payload
      };
    default:
      return state;
  }
};

const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <StateContext.Provider value={[state, dispatch]}>
      {children}
    </StateContext.Provider>
  );
};

export { StateContext };
export default StateProvider;
