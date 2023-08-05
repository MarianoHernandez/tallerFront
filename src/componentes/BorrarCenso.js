import React, { useEffect } from "react";
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

  useEffect(() => {
    if (localStorage.getItem("session") === null) {
      window("/");
    }
  });

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
          dispatch(savepeople(people.filter((p) => p.id !== state.id)));
          window("/home/listado");
        }
      });
  };
  return (
    <div className="card text-center d-grid col-10 mx-auto mt-5">
        <h1>Seguro desea borrar a la persona?</h1>
      <div className="row mt-5">
        <div className="col d-grid">
          <input
            type="button"
            className="btn btn-danger"
            onClick={borrar}
            value="Borrar"
          ></input>
        </div>
        <div className="col d-grid">
          <Link to="/home/listado" className="btn btn-danger">
            Cancelar
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BorrarCenso;
