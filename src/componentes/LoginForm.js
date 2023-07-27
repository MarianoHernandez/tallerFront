import React, { useRef } from 'react';

const LoginForm = () => {
  const usernameRef = useRef();
  const passwordRef = useRef();

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
           console.log(json)
          }
      });

    // Limpiar el formulario después del envío
    usernameRef.current.value = '';
    passwordRef.current.value = '';
  };

  return (
    <div>
      <div class="container">
        <div class="screen">
          <div class="screen__content">
            <form onSubmit={handleSubmit} class="login">
              <div class="login__field">
                <i class="login__icon fas fa-user"></i>
                <input type="text" class="login__input"  ref={usernameRef}  placeholder="User name"/>
              </div>
              <div class="login__field">
                <i class="login__icon fas fa-lock"></i>
                <input type="password" class="login__input" ref={passwordRef} placeholder="Password"/>
              </div>
              <button class="button login__submit">
                <span class="button__text">Login</span>
                <i class="button__icon fas fa-chevron-right"></i>
              </button>				
            </form>
          </div>
          <div class="screen__background">
            <span class="screen__background__shape screen__background__shape4"></span>
            <span class="screen__background__shape screen__background__shape3"></span>		
            <span class="screen__background__shape screen__background__shape2"></span>
            <span class="screen__background__shape screen__background__shape1"></span>
          </div>		
        </div>
      </div>
    
    </div>
  );
};

export default LoginForm;