import * as types from "./actionTypes";
import * as courseApi from "../../api/courseApi";

/* Action: Contendra nuestros creadores de acciones, retorna objeto plano -> type property and payload
payload: course left sintaxis abreviada del objeto (coincide). Now we cant make a typo. 
We get compile-time safety too "CREATE COURSE"
*/
export function createCourse(course) {
  return { type: types.CREATE_COURSE, course };
}

//action
export function loadCourseSuccess(courses) {
  return { type: types.LOAD_COURSES_SUCCESS, courses };
}

/*thunk(middleware), lets load courses when the app initially loads. Redux thunk injects dispatch so we dont have too.
cada thunk devuelve una funcion que acepta el envio como argumento. esta funcion es usada por el middleware.
Hace una llamada a una promesa (then). loadCoursesSucess (action)
*/
export function loadCourses() {
  return function (dispatch) {
    return courseApi
      .getCourses()
      .then((courses) => {
        dispatch(loadCourseSuccess(courses));
      })
      .catch((error) => {
        throw error;
      });
  };
}
