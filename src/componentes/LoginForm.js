import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MessageError } from "./MessageError";

const LoginForm = () => {
  const usernameRef = useRef();
  const passwordRef = useRef();

  const window = useNavigate();

  useEffect(() => {
    localStorage.clear();
  });
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Obtener los valores del formulario usando useRef
    const usuario = usernameRef.current.value;
    const password = passwordRef.current.value;

    let objUsuario = {
      usuario: usuario,
      password: password,
    };

    fetch("https://censo.develotion.com/login.php", {
      method: "POST",
      body: JSON.stringify(objUsuario),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.codigo === 200) {
          localStorage.setItem("session", json.apiKey);
          localStorage.setItem("id", json.id);
          window("/home");
        } else {
          localStorage.clear();
          setError(`${json.mensaje}`);
        }
      });

    // Limpiar el formulario después del envío
    usernameRef.current.value = "";
    passwordRef.current.value = "";
  };

  return (
    <div className="contenedor">
      <div className="card text-center d-grid col-10 mx-auto" >
        <h2 className="active mb-3"> Inicio de sesion </h2>
        <form className="d-grid col-6 mx-auto" onSubmit={handleSubmit}>
          <input
            type="text"
            id="login"
            className="input-group form-control mb-3"
            name="login"
            ref={usernameRef}
            placeholder="username"
          />
          <input
            type="password"
            id="password"
            className="input-group form-control mb-3"
            name="login"
            ref={passwordRef}
            placeholder="password"
          />
          <div className="d-grid col-6 mx-auto">
            <input type="submit" class="btn btn-primary " value="Log In" />
          </div>
        </form>
        <hr />
        {error && <MessageError texto={error}></MessageError>}
        <div className="d-grid col-6 mx-auto">
          <Link className=" btn btn-success " to="/register">
            Crear cuenta nueva
          </Link>
        </div>
      </div>
    </div>

  );
};

export default LoginForm;
