import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => (
    <div className="jumbotron">
        <h1> Administrador </h1>
        <p> Sistema para gestionar proyectos de investigación IoT - Research Lab at ESPOL</p>
        <Link to="about" className="btn btn-primary btn-lg">
            Conocer más
        </Link>
    </div>
);

export default HomePage;