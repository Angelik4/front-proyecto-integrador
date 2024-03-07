import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './Routes/Home';
import Galeria from './Routes/Galeria';
import Login from './Routes/Login';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Register from './Routes/Register';
import Question from './Routes/Question';
import Detail from './Routes/Detail';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<App />}>
                  <Route index element={<Home />} />
                  <Route path="home" element={<Home />} />
                  <Route path="detalle/:id" element={<Detail />} />
                  <Route path="galeria" element={<Galeria />} />
                  <Route path="question" element={<Question />} />
                  <Route path="login" element={<Login />} />
                  <Route path="register" element={<Register />} />
              </Route>
          </Routes>
      </BrowserRouter>
);

reportWebVitals();
