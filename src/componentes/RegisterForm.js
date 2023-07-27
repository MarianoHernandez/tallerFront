import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../features/userSlice";
import { MessageOk } from "./MessageOk";
import { MessageError } from "./MessageError";

const RegisterForm = () => {
  const usernameRef = useRef();
  const passwordRef = useRef();
  const dispatch = useDispatch();
  const [isRegistered, setIsRegistered] = useState(false);
  const [repeatedUser, setRepeatedUser] = useState(false);
  const [brongUser, setBrongUser] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

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
        console.log(json);
        if (json.codigo === 200) {
          // Enviar los datos al estado usando dispatch
          dispatch(addUser({ id: json.id, usuario, password }));
          setIsRegistered(true);
        } else if (json.codigo === 409) {
          setRepeatedUser(true);
        } else if (json.codigo === 404) {
          setBrongUser(true);
        }
      });

    // Limpiar el formulario después del envío
    usernameRef.current.value = "";
    passwordRef.current.value = "";
  };

  return (
    <div>
      <div className="container">
        <div className="screen">
          <div className="screen__content">
            <form onSubmit={handleSubmit} className="login">
              <div className="login__field">
                <i className="login__icon fas fa-user"></i>
                <input
                  type="text"
                  className="login__input"
                  ref={usernameRef}
                  placeholder="User name"
                  required
                />
              </div>
              <div className="login__field">
                <i className="login__icon fas fa-lock"></i>
                <input
                  type="password"
                  className="login__input"
                  ref={passwordRef}
                  placeholder="Password"
                  required
                />
              </div>
              <button className="button login__submit">
                <span className="button__text">Register</span>
                <i className="button__icon fas fa-chevron-right"></i>
              </button>
            </form>
            {isRegistered && (
          <MessageOk texto="Registro realizado con éxito"></MessageOk>
        )}
        {repeatedUser && (
          <MessageError texto="Usuario Duplicado"></MessageError>
        )}
        {brongUser && (
          <MessageError texto="Debe proporcionar usuario y contraseña"></MessageError>
        )}
          </div>
          <div className="screen__background">
            <span className="screen__background__shape screen__background__shape4"></span>
            <span className="screen__background__shape screen__background__shape3"></span>
            <span className="screen__background__shape screen__background__shape2"></span>
            <span className="screen__background__shape screen__background__shape1"></span>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default RegisterForm;
