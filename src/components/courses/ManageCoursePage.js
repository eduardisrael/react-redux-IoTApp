import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { loadCourses, saveCourse } from "../../redux/actions/courseActions";
import { loadAuthors } from "../../redux/actions/authorActions";
import PropTypes from "prop-types";
import CourseForm from "./CourseForm";
import { newCourse } from "../../../tools/mockData";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";

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
  history,
  ...props
}) {
  /*useState hook allows us to add React state to function components
  destructuracion: [variable de estado, funcion set], use state acepta un 
  argumento predeterminado, en este caso un estado central a una copia del 
  curso pasado en props. Goal: when our props change, we need to update our components state*/
  const [course, setCourse] = useState({ ...props.course });
  /*este estado mantendra cualquier eroor que ocurra cuando ejecutemos
  la validacion*/
  const [errors, setErrors] = useState({});

  //ocultar save y mejorar UX, state local
  const [saving, setSaving] = useState(false);

  /*useEffect permite controlar efectos secundarios (hooks) */
  useEffect(() => {
    /*valida que carga cursos una sola vez, mejora performance(eficiente),no hacemos solicitudes adicionales.
    the empty array as a second argument to effect will run once when the component mounts*/
    if (courses.length === 0) {
      loadCourses().catch((error) => {
        alert("Loading courses failed" + error);
      });
    } else {
      setCourse({ ...props.course }); //this will copy the course passed in on props to state anytime a new
      //course is passed in
    }

    if (authors.length === 0) {
      loadAuthors().catch((error) => {
        alert("Loading authors failed" + error);
      });
    }
  }, [props.course]);

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

  function formIsValid() {
    const { title, authorId, category } = course;
    const errors = {};

    if (!title) errors.title = "Title is required.";
    if (!authorId) errors.author = "Author is required";
    if (!category) errors.category = "Category is required";

    setErrors(errors);
    // Form is valid if the errors object still has no properties
    return Object.keys(errors).length === 0;
  }

  /*this is passed in on props, so it's already bound to dispatch. The bound saveCourse
  on props takes precedence over the unbound saveCourse thunk at the top.
  .then (promesa) que despues que se guardo, use el historial de reactrouter para cambiar la URL
  a la courseListPage. 
  */
  function handleSave(event) {
    event.preventDefault();
    if (!formIsValid()) return;
    setSaving(true);
    saveCourse(course)
      .then(() => {
        toast.success("Course saved.");
        history.push("/courses");
      })
      .catch((error) => {
        setSaving(false); //this way the user can try submitting the form again after error occurs.
        setErrors({ onSave: error.message });
      });
  }

  return authors.length === 0 || courses.length === 0 ? (
    <Spinner />
  ) : (
    <CourseForm
      course={course}
      errors={errors}
      authors={authors}
      onChange={handleChange}
      onSave={handleSave}
      saving={saving}
    />
  );
}

/*Any component loaded via <Route> gets history passed in on props from react router*/
ManageCoursePage.propTypes = {
  course: PropTypes.object.isRequired,
  authors: PropTypes.array.isRequired,
  courses: PropTypes.array.isRequired,
  loadCourses: PropTypes.func.isRequired,
  loadAuthors: PropTypes.func.isRequired,
  saveCourse: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

/*find obtener curso solicitado, si no se encuentra devuelve null, this is a selector. 
It selects data from the redux store, you could declare this in the course reducer for easy reuse.
For performance you could memoize using reselect */
export function getCourseBySlug(courses, slug) {
  return courses.find((course) => course.slug === slug) || null;
}

/*determinan a que estado y acciones nos gustaria acceder en nuestro componente, Redux Mapping
Siempre estamos pasando un curso vacio, Goal: read the url to determine wheter the user is trying
to create a new course or edit an existing course, segundo parametro util ownProps.
Remember mapStatetoprops runs every time the redux store changes, so when courses are available,
we call getCourseByslug*/
function mapStateToProps(state, ownProps) {
  /*access in mapState - slug - App.js*/
  const slug = ownProps.match.params.slug;
  /*establecer si hay un curso o uno vacio*/
  const course =
    slug && state.courses.length > 0
      ? getCourseBySlug(state.courses, slug)
      : newCourse;
  return {
    course,
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
  saveCourse,
};

/*Redux connect*/
export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);
