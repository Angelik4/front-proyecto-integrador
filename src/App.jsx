import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Galeria from './Pages/Galeria';
import Login from './Pages/Login';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import Register from './Pages/Register';
import Question from './Pages/Question';
import Detail from './Pages/Detail';
import Administrador from './Pages/Administrador';
import { ProtectedRoute } from './Components/utils/ProtectedRoute';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <main className="container-main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route element={<ProtectedRoute user="Usuario Registrado" />}>
              <Route path="/home" element={<Home />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/detalle/:id" element={<Detail />} />
            <Route path="/galeria" element={<Galeria />} />
            <Route path="/question" element={<Question />} />
            {/* <Route path="/administrador" element={<Administrador />} /> */}
            <Route
              path="/administrador"
              element={
                <ProtectedRoute redirectTo="/home" user="Administrador">
                  <Administrador />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
