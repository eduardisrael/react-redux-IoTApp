import * as types from "../actions/actionTypes";

/*Reducer: function that accepts state and returns a new state
reducers aceptan el estado y accion como sus argumentos, estado-> inicializa (matriz de cursos)
retorn una copia actualizada del estado , podemos copiar la matriz existente, mantiene estado y luego agregar
el curso que se aprobo en action.course. Lo que devuelve el reducer se convierte en el nuevo estado para ese
reductor en particular, por lo tanto actualizara nuestra tienda Redux agregando la nueva accion aprobado action.course
a nuestra tienda redux.
If the reducer receives an action that it doesnt care about, it should return the unchanged state.
loadCoursesSuccess: ya que lo que se devuelve de nuestra api, reemplazara lo que estaba en nuestro estado,
todo lo que tenemos que hacer es devolver los cursos aqui. reductor que maneja la accion.*/

export default function courseReducer(state=[], action){
  switch(action.type) {
    case types.CREATE_COURSE:
      return [...state, {...action.course}];
    case types.LOAD_COURSES_SUCCESS:
      return action.courses 
    default:
      return state;
  }
}
