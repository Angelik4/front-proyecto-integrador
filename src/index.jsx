import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './Pages/Home';
import Galeria from './Pages/Galeria';
import Login from './Pages/Login';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Register from './Pages/Register';
import Question from './Pages/Question';
import Detail from './Pages/Detail';
import Administrador from './Pages/Administrador'

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
                  <Route path="Administrador" element={<Administrador />} />
              </Route>
          </Routes>
      </BrowserRouter>
);

reportWebVitals();
