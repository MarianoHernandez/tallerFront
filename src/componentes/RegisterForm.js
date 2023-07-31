import React, { useRef,useState } from 'react';
import { useDispatch } from "react-redux"
import { addUser } from '../features/userSlice';
import { MessageOk } from './MessageOk'
import {MessageError} from './MessageError'

const RegisterForm = () => {
  const usernameRef = useRef();
  const passwordRef = useRef();
  const dispatch = useDispatch();
  const [isRegister, setIsRegister] = useState('');
  const [error, setError] = useState('');


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
          setIsRegister('Registrado con exito');
        }else if(json.codigo === 409){
          setError('Error usuario repetido')
        }
        else if(json.codigo === 404){
          setError('Error usuario repetido')

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
      <Link to='/'>Login</Link>

    </form>
    {isRegister && <MessageOk texto={isRegister}></MessageOk>}
      {error && <MessageError texto={error}></MessageError>}

    </div>
  );
};

export default RegisterForm;