import React from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { savepeople } from "../features/peopleSlice";

export const BorrarCenso = () => {
  const dispatch = useDispatch();
  const people = useSelector((state) => state.people.peoples);
  const apiKey = localStorage.getItem("session");
  const id = localStorage.getItem("id");
  const window = useNavigate();
  let { state } = useLocation();

  
  const borrar = (e) => {
    e.preventDefault();

    const url = `https://censo.develotion.com/personas.php?idCenso=${state.id}`;
    fetch(url, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        apikey: apiKey,
        iduser: id,
      },
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.codigo === 401) {
          window("/");
        }
        if (json.codigo === 200) {

          dispatch(savepeople(people.filter(p => p.id !== state.id)))
          window("/home/listado");
        }
      });
  };
  return (
    <div className="centrarBorrarBody">
      <div className="borrarBody">
        <h1 className="borrarTitulo">Seguro desea borrar a la persona?</h1>
        <div className="botonesBorrar">
          <input
            type="button"
            className="botonBorrar"
            onClick={borrar}
            value="Borrar"
          ></input>
          <Link to="/home/listado" className="botonBorrar">
            Cancelar
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BorrarCenso;
