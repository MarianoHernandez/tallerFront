import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { AiOutlineDelete } from "react-icons/ai";


export const Person = ({
  nombre,
  ocupacion,
  fechaNacimiento,
  departamento,
  ciudad,
  id,
}) => {
  const jobs = useSelector((state) => state.job.jobs);
  const countrys = useSelector((state) => state.country.countrys);
  const citys = useSelector((state) => state.city.citys);

  return (
    <div className="card d-grid col-8 mx-auto">
      <div className="row">
        <div className="col text-start">
          <div className="card_date">Fecha de nacimiento: {fechaNacimiento}</div>
          <h3 className="card_name col">{nombre}</h3>
        </div>
        <div className="col text-start">
          Ocupacion: 
          {jobs.map((job) => {
            if (job.id === ocupacion) {
              return job.ocupacion;
            }
          })}<br />
          Departamento: 
          {countrys.map((country) => {
            if (country.id === departamento) {
              return country.nombre;
            }
          })}<br />
          Ciudad: 
          {citys.map((city) => {
            if (city.id === ciudad) {
              return city.nombre;
            }
          })}
        </div>
        <div className="col-2 justify-content-center ">
          <Link
            key={id}
            to="/home/borrarCenso"
            state={{ id: id }}
            className="card_arrow"
          >
            <AiOutlineDelete></AiOutlineDelete>
            Borrar
          </Link>
        </div>
      </div>

    </div>
  );
};
