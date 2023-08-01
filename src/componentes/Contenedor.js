import React, { useEffect } from "react";
import { useNavigate, NavLink, Outlet } from "react-router-dom";

export const Contenedor = () => {
  const windows = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("session") === null) {
      windows("/");
    }else{}
  }, []);
  return (
    <div className="Conteiner">
      <ul>
        <li>
            <NavLink className='elementoNav' to="/home/analisis">Analisis</NavLink>
        </li>
        <li>
            <NavLink className='elementoNav' to="/home/agregarcensada">Agregar</NavLink>
        </li>
        <li>
            <NavLink className='elementoNav' to="/home/listado">Listado</NavLink>
        </li>
        <li>
            <NavLink className='elementoNav' to="/home/totales">Total</NavLink>
        </li>
      </ul>
      <Outlet></Outlet>
    </div>
  );
};
