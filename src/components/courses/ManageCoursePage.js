import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { loadCourses, saveCourse } from "../../redux/actions/courseActions";
import { loadAuthors } from "../../redux/actions/authorActions";
import PropTypes from "prop-types";
import CourseForm from "./CourseForm";
import { newCourse } from "../../../tools/mockData";

/*hooks estado local, redux para estados globales.
useState: usar el operador para asignar  cualquier propiedad que 
no hayamos desestructurado a un ubjeto llamado ...props ("Assign any 
props I havent destructured on the left to a variable called props.
Now calling saveCourse in our component will call the saveCourse function
we just bound to dispatch in mapDispatchToProps
*/
function ManageCoursePage({
  courses,
  authors,
  loadAuthors,
  loadCourses,
  saveCourse,
  ...props
}) {
  /*useState hook allows us to add React state to function components
  destructuracion: [variable de estado, funcion set], use state acepta un 
  argumento predeterminado, en este caso un estado central a una copia del 
  curso pasado en props*/
  const [course, setCourse] = useState({ ...props.course });
  /*este estado mantendra cualquier eroor que ocurra cuando ejecutemos
  la validacion*/
  const [errors, setErrors] = useState({});

  /*useEffect permite controlar efectos secundarios (hooks) */
  useEffect(() => {
    /*valida que carga cursos una sola vez, mejora performance(eficiente),no hacemos solicitudes adicionales.
    the empty array as a second argument to effect will run once when the component mounts*/
    if (courses.length === 0) {
      loadCourses().catch((error) => {
        alert("Loading courses failed" + error);
      });
    }

    if (authors.length === 0) {
      loadAuthors().catch((error) => {
        alert("Loading authors failed" + error);
      });
    }
  }, []);

  /*this convention will allow us to update the corresponding
  property in state with a single change handler*/
  function handleChange(event) {
    const { name, value } = event.target;
    /*Im using the functional form of setState so i can safely
    set new state that's based on the existing state*/
    setCourse((prevCourse) => ({
      ...prevCourse,
      [name]: name === "authorId" ? parseInt(value, 10) : value,
      //Js syntax, it allows us to reference a property via a variable
    }));
  }

  /*this is passed in on props, so it's already bound to dispatch. The bound saveCourse
  on props takes precedence over the unbound saveCourse thunk at the top*/
  function handleSave(event) {
    event.preventDefault();
    saveCourse(course);
  }

  return (
    <CourseForm
      course={course}
      errors={errors}
      authors={authors}
      onChange={handleChange}
      onSave={handleSave}
    ></CourseForm>
  );
}

ManageCoursePage.propTypes = {
  course: PropTypes.object.isRequired,
  authors: PropTypes.array.isRequired,
  courses: PropTypes.array.isRequired,
  loadCourses: PropTypes.func.isRequired,
  loadAuthors: PropTypes.func.isRequired,
  saveCourse: PropTypes.func.isRequired
};

/*determinan a que estado y acciones nos gustaria acceder en nuestro componente, Redux Mapping*/
function mapStateToProps(state) {
  return {
    course: newCourse,
    courses: state.courses,
    authors: state.authors,
  };
}

/*lets use the object form of mapDispatchToProps to simplify our code, warning: these names are the same 
as the unbound thunks we imported at the top, this passes the *bound* action creator in on props, 
under the same name.
destructuracion concisa : the bound action passed in on props "wins" (function scope takes precedence
over module scope) Por lo tanto a los creadores de accion loadCourses y loadAuthor estan correctamente
vinculadas*/
const mapDispatchToProps = {
  loadCourses,
  loadAuthors,
  saveCourse
};

/*Redux connect*/
export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);
