import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from './Components/utils/AuthProvider'

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
        <App />
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root') // Monta la aplicación en el elemento con el ID 'root' en el HTML
);

reportWebVitals();
