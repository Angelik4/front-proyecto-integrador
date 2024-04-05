import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import "../css/Login.css";
import logoLogin from "../images/Group16.png";
import sendRequest from "../Components/utils/SendRequest";
import { useAuth } from "../Components/utils/AuthProvider"; // Importa el contexto de autenticación
import { jwtDecode } from "jwt-decode";

const Login = () => {
  const navigate = useNavigate();
  const { isLoggedIn, login } = useAuth(); // Usa el contexto de autenticación

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [error, setError] = useState("");
  const [userRole, setUserRole] = useState("");

  const handleEmailChange = (event) => {
    const newEmail = event.target.value;
    setEmail(newEmail);
    const isValid = validateEmail(newEmail);
    setIsValidEmail(isValid);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const validateEmail = (email) => {
    const regex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(email);
  };

  const handleLogin = async () => {
    if (email && password && isValidEmail) {
      try {
        const response = await sendRequest(
          "POST",
          "http://localhost:8081/auth/authenticate",
          {
            correo: email,
            contraseña: password,
          }
        );

        const token = response.jwt;
        localStorage.setItem("token", token);
        const decodedToken = jwtDecode(token);
        const userRole = decodedToken?.rol;
        setUserRole(userRole);
        login();
      } catch (error) {
        setError("Credenciales inválidas. Por favor, inténtelo de nuevo.");
      }
    } else {
      setError("Por favor complete todos los campos correctamente.");
    }
  };

  useEffect(() => {
    // Redirige al usuario a la página de inicio si ya está autenticado
    if (isLoggedIn) {
      if (userRole === "Administrador") {
        navigate("/administrador");
      } else {
        navigate("/home");
      }
    }
  }, [isLoggedIn, navigate, userRole]);

  return (
    <section className="content-main-login">
      <div className="contenedor_login">
        <div className="imagen-logo">
          <img src={logoLogin} alt="Logo" />
        </div>
        <div className="contenedor_login-title">
          <h2>Inicio de sesión</h2>
          <p>Por favor ingrese su usuario y contraseña</p>
        </div>
        <form>
          <div className="campo-formulario">
            <label htmlFor="email">Correo electrónico:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              placeholder="correo@gmail.com"
              onChange={handleEmailChange}
              required
            />
            {!isValidEmail && (
              <p className="mensaje-error">
                Su correo no tiene el formato correcto
              </p>
            )}
          </div>
          <div className="campo-formulario">
            <label htmlFor="contrasena">Contraseña:</label>
            <div className="content-pass">
              <input
                type={showPassword ? "text" : "password"}
                id="contrasena"
                name="contrasena"
                placeholder="**************"
                onChange={handlePasswordChange}
                required
              />
              <div
                className="Icon"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <span className="icon-eye">
                    <FontAwesomeIcon icon={faEye} />
                  </span>
                ) : (
                  <span className="icon-eye">
                    <FontAwesomeIcon icon={faEyeSlash} />
                  </span>
                )}
              </div>
            </div>
          </div>
          {error && <p className="mensaje-error">{error}</p>}
          <button type="button" onClick={handleLogin}>
            Iniciar sesión
          </button>
          <Link className="olvidoContrasena" to="#">
            ¿Olvidó su contraseña?
          </Link>
          <p>
            ¿No tienes una cuenta? <Link to="/register">Crear cuenta</Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Login;
