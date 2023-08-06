import React, { useEffect,useState } from "react";
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

  const [apiKey, setApiKey] = useState(localStorage.getItem("session"));
  const [id, setId] = useState(localStorage.getItem("id"));
  

  const getCitys = (apiKey,id) => {
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

  const getCountry = (apiKey,id) => {
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

  const getJobs = (apiKey,id) => {
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

  const getPeople = (apiKey,id) => {
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
      setApiKey(localStorage.getItem("session"))
      setId(localStorage.getItem("id"))

      getCitys(apiKey,id);
      getCountry(apiKey,id);
      getJobs(apiKey,id);
      getPeople(apiKey,id);

    }
  });

  return (
    <div>
      <NavBar></NavBar>
      <Outlet></Outlet>
    </div>
  );
};
