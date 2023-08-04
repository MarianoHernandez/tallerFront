import React, { useEffect, useState } from "react";

import { useSelector } from "react-redux";


export const Totales = () => {
  const people = useSelector((state) => state.people.peoples);
  const countrys = useSelector(state => state.country.countrys);
  const [idMontevideo, setidMontevideo] = useState(0);
 
  useEffect(() => {
    countrys.map(country => {
      if(country.nombre === 'Montevideo'){
        setidMontevideo(country.id)
      }
    })
  });
  return (
    <div className="cuerpoTotales">
      <div className="totalCensados">
        Cantidad de censados: {people.length}
      </div>
      <div className="conteinerTotals">
      <div className="conteinerindividual">
        Cantidad de censados en Montevideo {people.filter(p => +p.departamento === idMontevideo).length}
      </div>
      <div className="conteinerindividual">
        Cantidad de censados en el resto del pais {people.filter(p => +p.departamento !== idMontevideo).length}
      </div>
      </div>
    </div>
  )
}
