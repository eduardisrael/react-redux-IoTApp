import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  const activeStyle = { color: "#F15B2A" };

  return (
    <nav>
      <NavLink to="/" activeStyle={activeStyle} exact>
        Inicio
      </NavLink>
      {" | "}
      <NavLink to="/courses" activeStyle={activeStyle}>
        Cursos
      </NavLink>
      {" | "}
      <NavLink to="/about" activeStyle={activeStyle}>
        Acerca de
      </NavLink>
    </nav>
  );
};

export default Header;
