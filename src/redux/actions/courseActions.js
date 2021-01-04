import * as types from "./actionTypes";

/* Contendra nuestros creadores de acciones, retorna objeto plano -> type property and payload
payload: course left sintaxis abreviada del objeto (coincide) 
Now we cant make a typo. We get compile-time safety too
*/
export function createCourse(course) {
  return { type: types.CREATE_COURSE, course};
}