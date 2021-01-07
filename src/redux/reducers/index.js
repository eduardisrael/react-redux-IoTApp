/*root reducer, combinaremos todos nuestros reducers para tener un solo reductor
pasamos un objteo, cada propiedad se establece en el reductor, omite lado derecho courses en objeto.
Con una exportacion default puedo decidir como nombrar la importacion, courses: afectara la forma
en que hacemos referencia a esos datos en particular en nuestra tienda redux
*/
import { combineReducers } from "redux";
import courses from "./courseReducer";
import authors from "./authorReducer";
import apiCallsInProgress from "./apiStatusReducer";

const rootReducer = combineReducers({
  courses,
  authors,
  apiCallsInProgress
});

export default rootReducer;
