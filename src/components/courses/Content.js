import React from "react";
import imagen from "./google.png";
import hello from "./helloWorld.png";

var ex1 = `gcloud app deploy`
var ex2 = `
  Please choose the region where you want your App Engine application
  located:

  [1] europe-west2  (supports standard and flexible)
  [2] us-east1      (supports standard and flexible)
  [3] us-east4      (supports standard and flexible)
  [4] asia-northeast1 (supports standard and flexible)
  [5] asia-south1   (supports standard and flexible)
  [6] australia-southeast1 (supports standard and flexible)
  [7] southamerica-east1 (supports standard and flexible)
  [8] us-central    (supports standard and flexible)
  [9] europe-west3  (supports standard and flexible)
  [10] europe-west   (supports standard and flexible)
  [11] cancel
  Please enter your numeric choice:
`
var ex3=`gcloud app browse`


const Style = { color: 'white' };


const Content = () => (
  
  <div className="container">
    <div className="row">
      <div className="col-sm-10">
        <br></br>
        
        <h2>App Engine: Qwik Start - Python
        </h2>
        <br></br>
        <p style={{ color: "gray" }}>20 minutos</p>
        <br></br>
        <img src={imagen}></img>
        <h3>Descripcion General</h3>
        <p>
          App Engine permite que los desarrolladores se enfoquen en 
          lo que mejor saben hacer: escribir código. El entorno estándar 
          de App Engine se basa en instancias de contenedores que se 
          ejecutan en la infraestructura de Google.
        </p>
        <h4>Actividades</h4>
        <ul>
          <li>Descargar una aplicación</li>
          <li>Probarla</li>
          <li>Implementarla</li>
        </ul>
        <br></br>
        <h4>Implemente su aplicación</h4>
        <br></br>
        <p>Para implementar su aplicación en App Engine, ejecute el siguiente comando desde 
          el directorio raíz de la aplicación, que contiene el archivo app.yaml:</p>
        <pre>
          <code style={Style}>{ex1}</code>
        </pre>
        <p>Se le pedirá que ingrese dónde se ubicará su aplicación de App Engine.</p>
        <pre>
          <code style={Style}>{ex2}</code>
        </pre>
        <br></br>
        <h4>Vea su aplicación</h4>
        <p>Para iniciar su navegador, ingrese el siguiente comando y, 
          luego, haga clic en el vínculo que proporciona.</p>
          <br></br>
        <pre>
        <code style={Style}>{ex3}</code>
        </pre>
        <img src={hello}></img>
        <br></br>
        <br></br>
        <p>Se implementó su aplicación y puede leer el mensaje corto en su navegador.</p>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>

      </div>
      
      <div className="col-sm-2">
      <button
          style={{ marginBottom: 10 }}
          className="btn btn-success"
        >
          Comenzar Lab
        </button>
      </div>
    </div>
    

  </div>
);

export default Content;


