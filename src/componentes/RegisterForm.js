import React, { useRef,useState } from 'react';
import { useDispatch } from "react-redux"
import { addUser } from '../features/userSlice';
import { MessageOk } from './MessageOk'
import {MessageError} from './MessageError'

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

    fetch('https://censo.develotion.com/usuarios.php', {
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
            // Enviar los datos al estado usando dispatch
            dispatch(addUser({ id:json.id, usuario, password }))
            setIsRegistered(true);
          }else if(json.codigo === 409){
            setRepeatedUser(true);
          }
          else if(json.codigo === 404){
            setBrongUser(true);
          }
      });

    // Limpiar el formulario después del envío
    usernameRef.current.value = '';
    passwordRef.current.value = '';
  };

  return (
    <div>
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" ref={usernameRef} required />
      </div>

      <div>
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" ref={passwordRef} required />
      </div>
      <button type="submit">Register</button>

    </form>
      {isRegistered && <MessageOk texto='Registro realizado con éxito'></MessageOk>}
      {repeatedUser && <MessageError texto='Usuario Duplicado'></MessageError>}
      {brongUser && <MessageError texto='Debe proporcionar usuario y contraseña'></MessageError>}

    </div>
  );
};

export default RegisterForm;