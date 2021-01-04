import * as types from "../actions/actionTypes";

/*Reducer: function that accepts state and returns a new state
reducers aceptan el estado y accion como sus argumentos, estado-> inicializa (matriz de cursos)
retorn una copia actualizada del estado , podemos copiar la matriz existente, mantiene estado y luego agregar
el curso que se aprobo en action.course. Lo que devuelve el reducer se convierte en el nuevo estado para ese
reductor en particular, por lo tanto actualizara nuestra tienda Redux agregando la nueva accion aprobado action.course
a nuestra tienda redux.
If the reducer receives an action that it doesnt care about, it should return the unchanged state.
*/
export default function courseReducer(state=[], action){
  switch(action.type) {
    case types.CREATE_COURSE:
      return [...state, {...action.course}];
    default:
      return state;
  }
}
