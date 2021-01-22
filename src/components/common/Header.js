import React from "react";
import { NavLink } from "react-router-dom";


const Header = () => {
  const activeStyle = { color: "#F15B2A"};

  return (
    <nav>
      <NavLink id="bar-middle" to="/" activeStyle={activeStyle} exact>
        Inicio
      </NavLink>
      {" | "}
      <NavLink id="bar-middle" to="/courses" activeStyle={activeStyle}>
        Cursos
      </NavLink>
      {" | "}
      <NavLink id="bar-middle" to="/forum" activeStyle={activeStyle}>
        Foro: Preguntas
      </NavLink>
      {" | "}
      <NavLink id="bar-middle" to="/multimedia" activeStyle={activeStyle}>
        Contenido Multimedia
      </NavLink>
    </nav>
  );
};

export default Header;
