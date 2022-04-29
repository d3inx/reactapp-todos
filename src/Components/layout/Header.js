import React from "react";
import { NavLink } from "react-router-dom";


function Header() {
    return(
        <header>
            <div className="navbar navbar-dark bg-dark shadow-sm">
                <div className="container d-flex justify-content-between">
                    <a href="http://roocket.ir" className="navbar-brand d-flex align-items-center">
                    <strong>Todo App</strong>
                    </a>
                    <nav className="navbar navbar-expand-md ">
                        <div className="container-fluid">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/">Home</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/About">About</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/Contact">Contact</NavLink>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>
            </div>
        </header>
    )
}

export default Header;