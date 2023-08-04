import { Provider } from 'react-redux';
import './App.css';
import { store } from './store/store'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RegisterForm from './componentes/RegisterForm';
import LoginForm from './componentes/LoginForm';
import { NotFound } from './componentes/NotFound';
import { Contenedor } from './componentes/Contenedor';
import { PersonaCensada } from './componentes/PersonaCensada';
import { ListadoPersona } from './componentes/ListadoPersona';
import { Totales } from './componentes/Totales';
import { Analisis } from './componentes/Analisis';
import { BorrarCenso } from './componentes/BorrarCenso';
//import "./bootstrap.min.css";


function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
              <Route index path="/" element={<LoginForm />}></Route>
              <Route index path="/index.html" element={<LoginForm />}></Route>
              <Route path="/register" element={<RegisterForm />}></Route>
              <Route path="/logout"></Route>
              <Route path='/home' element={<Contenedor />}>
                <Route path='/home/analisis' element={<Analisis/>} ></Route>
                <Route path='/home/agregarcensada' element={<PersonaCensada/>} ></Route>
                <Route path='/home/listado' element={<ListadoPersona/>} ></Route>
                <Route path='/home/totales' element={<Totales/>} ></Route>
                <Route path='/home/borrarCenso' element={<BorrarCenso/>} ></Route>
              </Route>
              <Route path="*" element={<NotFound />}></Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}
///<RegisterForm />
export default App;
