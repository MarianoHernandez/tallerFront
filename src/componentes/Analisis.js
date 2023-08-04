import React from 'react'
import PorDepartamento from './Analisis/PorDepartamento'
import PorTrabajo from './Analisis/PorTrabajo'
import CuentaRegresiva from './Analisis/TiempoRestante'
export const Analisis = () => {
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
    </div>
  )
}
