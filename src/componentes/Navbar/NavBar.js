import React from 'react'
import { NavLink } from "react-router-dom";
import { FiActivity } from "react-icons/fi";
import { VscAdd } from "react-icons/vsc";
import { IoIosList } from "react-icons/io";
import { BiLogOut } from "react-icons/bi";
import { BsFillPeopleFill } from "react-icons/bs";
import logo from "../../imagen/logo_censo.png";

export const NavBar = () => {
    return (
        <div>
            <ul class="nav justify-content-center nav-fill">
                <li class="nav-item justify-content-start">
                    <img class="img-fluid" src={logo} alt="logo"></img>
                </li>
                <li class="nav-item justify-content-center">
                    <NavLink
                        className="elementoNav justify-content-center"
                        style={{ color: "white" }}
                        to="/home/analisis"
                    >
                        <FiActivity style={{ color: "white" }} />
                        Analisis
                    </NavLink>  </li>
                <li class="nav-item">
                    <NavLink
                        className="elementoNav justify-content-center"
                        style={{ color: "white" }}
                        to="/home/agregarcensada"
                    >
                        <VscAdd style={{ color: "white" }}></VscAdd>Agregar
                    </NavLink>  </li>
                <li class="nav-item">
                    <NavLink
                        className="elementoNav justify-content-center"
                        style={{ color: "white" }}
                        to="/home/listado"
                    >
                        <IoIosList></IoIosList>Listado
                    </NavLink>  </li>
                <li class="nav-item">
                    <NavLink
                        className="elementoNav justify-content-center"
                        style={{ color: "white" }}
                        to="/home/totales"
                    >
                        <BsFillPeopleFill></BsFillPeopleFill>Total
                    </NavLink>  </li>
                <li class="nav-item">
                    <NavLink className="elementoNav justify-content-end" style={{ color: "white" }} to="/">
                        <BiLogOut></BiLogOut>LogOut
                    </NavLink>
                </li>
            </ul>
        </div>

    )
}
