import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from 'react-router-dom'
import { MessageError } from "./MessageError";

const LoginForm = () => {
  const usernameRef = useRef();
  const passwordRef = useRef();

  const window = useNavigate()

  useEffect(()=>{
    localStorage.clear() 
  })
  const [error, setError] = useState("");

  const handleSubmit = (e) => {

    e.preventDefault();

    // Obtener los valores del formulario usando useRef
    const usuario = usernameRef.current.value;
    const password = passwordRef.current.value;


    let objUsuario = {
      usuario: usuario,
      password: password
  };

    fetch('https://censo.develotion.com/login.php', {
      method: 'POST',
      body: JSON.stringify(objUsuario),
      headers: {
          'Content-type': 'application/json',
      },
  })
      .then((response) => response.json())
      .then((json) => {
          console.log(json);
          if(json.codigo === 200){
            localStorage.setItem('session', json.apiKey)
            localStorage.setItem('id', json.id)
            window("/home")
           console.log(json)
          }else{
            localStorage.clear()
            setError(`${json.mensaje}`);
          }
      });

    // Limpiar el formulario después del envío
    usernameRef.current.value = '';
    passwordRef.current.value = '';
  };

  return (
    <div className="wrapper fadeInDown">
    <div id="formContent">
      <h2 className="active"> Sign In </h2>
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
        <input type="submit" className="fadeIn fourth" value="Log In" />
      </form>
      {error && <MessageError texto={error}></MessageError>}
      <div id="formFooter">
        <Link className="underlineHover" to='/register'>
          Registro?
        </Link>
      </div>
    </div>
  </div>
  );
};

export default LoginForm;