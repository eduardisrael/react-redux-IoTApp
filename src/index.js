import React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./components/App";
import "./index.css";
import configureStore from "./redux/configureStore";
import { Provider as ReduxProvider } from "react-redux";

/*Instantiate Store and Provider: It can be useful to pass initial state into the store here
if you're server rendering or initializing your Redux store with data from localStorage. 
Nuestra store se establece en una tienda llamada tienda constante, que hacemos con esto? Provider
Provider: this will provide redux store data to our react components 
ReduxProvider: ahora nuestra app podra acceder a nuestra tienda redux, esta envuelta en provider
*/
const store = configureStore(); //arg default

render(
  <ReduxProvider store={store}> 
    <Router>
      <App />
    </Router>
  </ReduxProvider>,
  document.getElementById("app")
);
