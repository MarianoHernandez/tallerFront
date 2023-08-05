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
    <div className="container card text-center mt-4">
      <div className="row  row-cols-2 ">
        <div className="col-12 col-sm-12 col-md-6 gap-3">
          <PorDepartamento></PorDepartamento>
        </div>
        <div className="col-12 col-sm-12 col-md-6 gap-3">
          <PorTrabajo></PorTrabajo>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 col-sm-12 col-12 gap-3">
          <Mapa></Mapa>
        </div>
        <div className="col-md-6 col-sm-12 col-12 gap-3">
          <Porcentaje></Porcentaje>
        </div>
      </div>
      <div className='text-center'>
        <CuentaRegresiva></CuentaRegresiva>
      </div>
    </div>
  )
}
