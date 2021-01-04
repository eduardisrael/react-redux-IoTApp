/* Contendra nuestros creadores de acciones, retorna objeto plano -> type propery and payload
payload: course left sintaxis abreviada del objeto (coincide) */
export function createCourse(course) {
  return { type: "CREATE_COURSE", course};
}