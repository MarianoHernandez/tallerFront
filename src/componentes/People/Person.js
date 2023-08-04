import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

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
    <div className="card">
      <h3 className="card_title">{nombre}</h3>
      <p className="card_content">
        Ocupacion:
        {jobs.map((job) => {
          if (job.id === ocupacion) {
            return job.ocupacion;
          }
        })}
      </p>
      <p className="card_content">
        Departamento:
        {countrys.map((country) => {
          if (country.id === departamento) {
            return country.nombre;
          }
        })}
      </p>
      <p className="card_content">
        Ciudad:
        {citys.map((city) => {
          if (city.id === ciudad) {
            return city.nombre;
          }
        })}
      </p>
      <div className="card_date">Fecha de nacimiento: {fechaNacimiento}</div>
      <Link
        key={id}
        to="/home/borrarCenso"
        state={{ id: id }}
        className="card_arrow"
      >
        Borrar
      </Link>
    </div>
  );
};
