import React, { useEffect } from "react";
import { useNavigate, NavLink, Outlet } from "react-router-dom";
import { FiActivity } from "react-icons/fi";
import {VscAdd} from "react-icons/vsc"; 
import { IoIosList } from "react-icons/io";
import { BiLogOut} from "react-icons/bi";
import { BsFillPeopleFill } from "react-icons/bs";
import logo from '../imagen/logo_censo.png'
import { savecity } from "../features/citySlice";
import { savecountry } from "../features/countrySlice";
import { savejob } from "../features/jobSlice";
import { useDispatch } from "react-redux";


export const Contenedor = () => {

  const windows = useNavigate();
  const dispatch = useDispatch();

  const apiKey = localStorage.getItem('session');
  const id = localStorage.getItem('id');

  const getCitys = () => {
    fetch('https://censo.develotion.com/ciudades.php', {
      method: 'GET',
      headers: {
          'Content-type': 'application/json',
          'apikey':apiKey,
          'iduser':id
      },
  })
      .then((response) => response.json())
      .then((json) => {
        dispatch(savecity(json.ciudades))
      });
  }

  const getCountry = () => {
    fetch('https://censo.develotion.com//departamentos.php', {
      method: 'GET',
      headers: {
          'Content-type': 'application/json',
          'apikey':apiKey,
          'iduser':id
      },
  })
      .then((response) => response.json())
      .then((json) => {
        console.log(json)
        dispatch(savecountry(json.departamentos))
      });
  }

  const getJobs = () => {
    fetch('https://censo.develotion.com/ocupaciones.php', {
      method: 'GET',
      headers: {
          'Content-type': 'application/json',
          'apikey':apiKey,
          'iduser':id
      },
  })
      .then((response) => response.json())
      .then((json) => {
        console.log(json)
        dispatch(savejob(json.ocupaciones))
      });
  }


  useEffect(() => {
    if (localStorage.getItem("session") === null) {
      windows("/");
    }else{
      getCitys();
      getCountry();          
      getJobs();

    }
  },[]);

  return (
    <div className="navbar">
      <ul>
        <img src={logo} alt="logo"></img>
        <li >
          <NavLink className='elementoNav' style={{color:'white'}} to="/home/analisis"><FiActivity style={{color:'white'}}/>Analisis</NavLink>
        </li>
        <li>
            <NavLink className='elementoNav' style={{color:'white'}} to="/home/agregarcensada"><VscAdd style={{color:'white'}}></VscAdd>Agregar</NavLink>
        </li>
        <li>
            <NavLink className='elementoNav' style={{color:'white'}} to="/home/listado"><IoIosList></IoIosList>Listado</NavLink>
        </li>
        <li>
            <NavLink className='elementoNav' style={{color:'white'}} to="/home/totales"><BsFillPeopleFill></BsFillPeopleFill>Total</NavLink>
        </li>
        <li>
            <NavLink className='elementoNav' style={{color:'white'}} to="/"><BiLogOut></BiLogOut>LogOut</NavLink>
        </li>
      </ul>
      <Outlet></Outlet>
    </div>
  );
};
