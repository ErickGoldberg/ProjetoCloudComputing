import React from "react";
import { Link } from "react-router-dom";
import "./styles.css/navBar.css";
import './styles.css/reset.css'
import logo from '../img/logo.png'


const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <ul className="navbar-items">
          <li className="navbar-item">
            <Link to="/user" className="navbar-link">
              Usuários
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/events" className="navbar-link">
              Eventos
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/" className="navbar-link">
              <img src={logo} className="logo"></img>
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/chamados" className="navbar-link">
              Chamados
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/cashiers" className="navbar-link">
              Caixas
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
