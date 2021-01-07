import * as types from "./actionTypes";
import * as courseApi from "../../api/courseApi";
import { beginApiCall, apiCallError } from "./apiStatusActions";

/* Action: Contendra nuestros creadores de acciones, retorna objeto plano -> type property and payload
payload: course left sintaxis abreviada del objeto (coincide). Now we cant make a typo. 
We get compile-time safety too "CREATE COURSE" action*/
export function loadCourseSuccess(courses) {
  return { type: types.LOAD_COURSES_SUCCESS, courses };
}

export function createCourseSuccess(course){
  return { type: types.CREATE_COURSE_SUCCESS, course}
}

export function updateCourseSuccess(course) {
  return { type: types.UPDATE_COURSE_SUCCESS, course };
}

export function deleteCourseOptimistic(course) {
  return { type: types.DELETE_COURSE_OPTIMISTIC, course };
}

/*thunk(middleware), lets load courses when the app initially loads. Redux thunk injects dispatch so we dont have too.
cada thunk devuelve una funcion que acepta el envio como argumento. esta funcion es usada por el middleware.
Hace una llamada a una promesa (then). loadCoursesSucess (action)
*/
export function loadCourses() {
  return function (dispatch) {
    dispatch(beginApiCall());
    return courseApi
      .getCourses()
      .then((courses) => {
        dispatch(loadCourseSuccess(courses));
      })
      .catch((error) => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

/*thunk*/
export function saveCourse(course) {
  //eslint-disable-next-line no-unused-vars
  return function (dispatch) {
    dispatch(beginApiCall());
    return courseApi
      .saveCourse(course)
      .then(savedCourse => {
        course.id
          ? dispatch(updateCourseSuccess(savedCourse))
          : dispatch(createCourseSuccess(savedCourse));
      })
      .catch((error) => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

/*thunk, differences, inmmediately dispatching deleteCourse, not dispatching beginApiCall, Optimistic Delete*/
export function deleteCourse(course) {
  return function(dispatch) {
    // Doing optimistic delete, so not dispatching begin/end api call
    // actions, or apiCallError action since we're not showing the loading status for this.
    dispatch(deleteCourseOptimistic(course));
    return courseApi.deleteCourse(course.id);
  };
}