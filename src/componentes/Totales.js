import React, { useEffect, useState } from "react";

import { useSelector } from "react-redux";


export const Totales = () => {
  const people = useSelector((state) => state.people.peoples);
  const countrys = useSelector(state => state.country.countrys);
  const [idMontevideo, setidMontevideo] = useState(0);
 
  useEffect(() => {
    if (localStorage.getItem("session") === null) {
      window("/");
    }
  });


  useEffect(() => {
    countrys.map(country => {
      if(country.nombre === 'Montevideo'){
        setidMontevideo(country.id)
      }
    })
  });
  return (
    <div className="card mt-5 text-center d-grid col-10 mx-auto">
      <div className="card mb-5">
        Cantidad de censados: {people.length}
      </div>
      <div className="row">
      <div className="card col">
        Cantidad de censados en Montevideo {people.filter(p => +p.departamento === idMontevideo).length}
      </div>
      <div className="card col">
        Cantidad de censados en el resto del pais {people.filter(p => +p.departamento !== idMontevideo).length}
      </div>
      </div>
    </div>
  )
}
