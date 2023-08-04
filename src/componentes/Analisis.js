import React, { useEffect } from 'react'
import PorDepartamento from './Analisis/PorDepartamento'
import PorTrabajo from './Analisis/PorTrabajo'
import CuentaRegresiva from './Analisis/TiempoRestante'
import Porcentaje from './Analisis/Porcentaje'
import Mapa from './Analisis/Mapa'
import { useNavigate } from "react-router-dom";

export const Analisis = () => {
  const window = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("session") === null) {
      window("/");
    }
  });
  
  return (
    <div className='Conteiner'>
      <div>

        <PorDepartamento></PorDepartamento>
      </div>
      <div>
<PorTrabajo></PorTrabajo>
      </div>
      <div>
      <CuentaRegresiva></CuentaRegresiva>
      </div>
      <div>
        <Porcentaje></Porcentaje>
      </div>
      <div>
      <Mapa></Mapa>
      </div>
    </div>
  )
}
