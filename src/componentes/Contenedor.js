import React, { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { savecity } from "../features/citySlice";
import { savecountry } from "../features/countrySlice";
import { savejob } from "../features/jobSlice";
import { useDispatch } from "react-redux";
import { savepeople } from "../features/peopleSlice";
import { NavBar } from "./Navbar/NavBar";

export const Contenedor = () => {
  const windows = useNavigate();
  const dispatch = useDispatch();

  const apiKey = localStorage.getItem("session");
  const id = localStorage.getItem("id");

  const getCitys = () => {
    fetch("https://censo.develotion.com/ciudades.php", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        apikey: apiKey,
        iduser: id,
      },
    })
      .then((response) => response.json())
      .then((json) => {
        dispatch(savecity(json.ciudades));
      });
  };

  const getCountry = () => {
    fetch("https://censo.develotion.com//departamentos.php", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        apikey: apiKey,
        iduser: id,
      },
    })
      .then((response) => response.json())
      .then((json) => {
        dispatch(savecountry(json.departamentos));
      });
  };

  const getJobs = () => {
    fetch("https://censo.develotion.com/ocupaciones.php", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        apikey: apiKey,
        iduser: id,
      },
    })
      .then((response) => response.json())
      .then((json) => {
        dispatch(savejob(json.ocupaciones));
      });
  };

  const getPeople = () => {
    const url = `https://censo.develotion.com/personas.php?idUsuario=${id}`;
    fetch(url, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        apikey: apiKey,
        iduser: id,
      },
    })
      .then((response) => response.json())
      .then((json) => {
        dispatch(savepeople(json.personas));
      });
  };

  useEffect(() => {
    if (localStorage.getItem("session") === null) {
      windows("/");
    } else {
      getCitys();
      getCountry();
      getJobs();
      getPeople();

    }
  });

  return (
    <div>
      <NavBar></NavBar>
      <Outlet></Outlet>
    </div>
  );
};
