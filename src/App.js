import { Provider } from 'react-redux';
import './App.css';
import { store } from './store/store'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RegisterForm from './componentes/RegisterForm';
import LoginForm from './componentes/LoginForm';
import { store } from "./store/store";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
              <Route path="/login" element={<LoginForm />}></Route>
              <Route path="/registro" element={<RegisterForm />}></Route>
              <Route path="/logout" element={<Contacto />}></Route>
              {/* <Route path="/dashboard" element={<Analisis />}>
                <Route path='/agregar'></Route>  
                <Route path='/listadopersona'></Route>  //Filtro
                <Route path='/totale'></Route>  
              </Route> */}
              <Route path="*" element={<NoEncontrado />}></Route>
          </Routes>
        </BrowserRouter>

      </Provider>
    </div>
  );
}
///<RegisterForm />
export default App;
