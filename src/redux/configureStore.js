import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./reducers";
import reduxImmutableStateInvariant from "redux-immutable-state-invariant";
import thunk from "redux-thunk";

/*es util tener una funcion que configura la tienda. Punto de entrada de nuestra app 
Redux middleware is a way to enhance redux's behavior, with extra functionality. 
reduxImmutableStateInvariant: this will warning us if we accidentally mutate Redux state(Red de seguridad)
DevTools Redux: compose - utiles para interactuar con ReduxStore, Asi que las 
llamadas composeEnhancers aplican Middleware y reduxImmutableStateInvariant es una pieza
de middleware que estamos usando. Y ahora podemos interactuar con nuestra tienda Redux usando
utilizando las herramientas de desarrollo de navegador 
*/
export default function configureStore(initialState) {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; //add support for Redux dev tools
  return createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(thunk, reduxImmutableStateInvariant()))
  );
}