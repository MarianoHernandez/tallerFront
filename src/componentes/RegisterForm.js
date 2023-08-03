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
    <div className="fondoLogin">
      <div className="wrapper fadeInDown">
        <div id="formContent">
          <h2 className="active"> Sign Up </h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              id="login"
              className="fadeIn second inputs"
              name="login"
              ref={usernameRef}
              placeholder="username"
            />
            <input
              type="password"
              id="password"
              className="fadeIn third inputs"
              name="login"
              ref={passwordRef}
              placeholder="password"
            />
            <input type="submit" className="fadeIn fourth" value="Register" />
          </form>
          {isRegister && <MessageOk texto={isRegister}></MessageOk>}
          {error && <MessageError texto={error}></MessageError>}
          <div id="formFooter">
            <Link className="underlineHover" to='/'>
              Login?
            </Link>
          </div>
        </div>
      </div>
      </div>

  );
};

export default RegisterForm;
