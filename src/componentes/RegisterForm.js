import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../features/userSlice";
import { MessageOk } from "./MessageOk";
import { MessageError } from "./MessageError";
import { Link, useNavigate } from 'react-router-dom'

const RegisterForm = () => {
  const usernameRef = useRef();
  const passwordRef = useRef();
  const dispatch = useDispatch();
  const [isRegister, setIsRegister] = useState("");
  const [error, setError] = useState("");

  const window = useNavigate()


  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    // Obtener los valores del formulario usando useRef
    const usuario = usernameRef.current.value;
    const password = passwordRef.current.value;

    let objUsuario = {
      usuario: usuario,
      password: password,
    };

    fetch("https://censo.develotion.com/usuarios.php", {
      method: "POST",
      body: JSON.stringify(objUsuario),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.codigo === 200) {
          // Enviar los datos al estado usando dispatch
          dispatch(addUser({ id: json.id, usuario, password }));
          setIsRegister("Registrado con exito");
          localStorage.setItem('session', json.apiKey)
          window("/home")
        } else if (json.codigo === 409) {
          localStorage.clear()
          setError(`${json.mensaje}`);
        } else if (json.codigo === 404) {
          localStorage.clear()
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
      <h2 className="active mb-3"> Registro </h2>
      <form className="d-grid col-6 mx-auto"  onSubmit={handleSubmit}>
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
          className="input-group form-control mb-3" name="login"
          ref={passwordRef}
          placeholder="password"
        />
        <div className="d-grid col-6 mx-auto">
          <input type="submit" class="btn btn-primary " value="Regsitro" />
        </div>          
      </form>
      <hr></hr>
      {isRegister && <MessageOk texto={isRegister}></MessageOk>}
      {error && <MessageError texto={error}></MessageError>}
      <div id="d-grid col-6 mx-auto">
        <Link className="btn btn-success" to="/">
          Iniciar sesion
        </Link>
      </div>
    </div>
    </div>

  );
};

export default RegisterForm;
