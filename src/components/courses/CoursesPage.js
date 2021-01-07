import React from "react";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
import * as authorActions from "../../redux/actions/authorActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import CourseList from "./CourseList";
import { Redirect } from "react-router-dom";

class CoursesPage extends React.Component {

  /*field class*/
  state = {redirectToAddCoursePage: false};

  /*load: metodo se invoca cuando se monta un componente en el DOM
  Recuerde que esto devuelve una promesa, por lo que llamaremos catch error
  */
  componentDidMount(){
    //destructuracion 
    const { courses, authors, actions } = this.props;

    //valida que carga cursos una sola vez, mejora performance(eficiente),no hacemos solicitudes adicionales.
    if (courses.length === 0) {
      actions.loadCourses().catch(error => {
        alert("Loading courses failed" + error);
      });
    }

    if (authors.length === 0){  
      actions.loadAuthors().catch(error => {
        alert("Loading authors failed" + error);
      });
    }
  }

  /*render tiene un effect secundario, Si el valor en estado es True, se redirigira a la URL del
  curso agregar. 
  */
  render() {
    return (
      <>
        {this.state.redirectToAddCoursePage && <Redirect to="/course"/>}
        <h2>Courses</h2>

        <button
          style={{ marginBottom: 20 }}
          className="btn btn-primary add-course"
          onClick={() => this.setState({redirectToAddCoursePage: true})}
        >
          Add Course
        </button>
        <CourseList courses={this.props.courses}/>
      </>
    );
  }
}

/*Nos ayuda a especificar lo que nuestro componente acepta.
Ahora hemos aclarado que esperamos que el envio se pase al componente.
*/
CoursesPage.propTypes = {
  authors: PropTypes.array.isRequired,
  courses: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

/*Estos dos argumentos no tienen nada magico, solo lo pasas para conectarte.
this func determines what state is passed to our component via props (exponemos a nuestro componente)
Y recibe dos argumentos. Por ahora la tienda es simple, devuelve solo cursos fuera del estado.
Al declarar mapStateToprops se lo mas especifico posible, acerca de que datos expone al componente,
solo los datos que el componente necesita 
OwnProps: es una referencia a los propios accesorios del componente
let's add the authors name to each curse. We need both course and author before we can do this mapping
*/
function mapStateToProps(state) {
  return {
    courses: 
      state.authors.length === 0
      ? []
      : state.courses.map(course => {
          return {
            ...course,
            authorName: state.authors.find(a => a.id ===course.authorId).name
          };
        }),
    authors: state.authors
  };
}


/*mapDispatchToPropsThis lets us declare what actions to pass to our component on props
cuando omitimos este parametro, nuestro componente obtiene una propiedad de envio
inyectada automaticamente. Asi que podamos usarlo para despachar nuestras acciones.
Remember, if you dont call dispatch, nothing will happen. Action creators must be called by dispatch.
Dispatch es la funcion que notifica a redux sobre una accion.
Since we declared mapDispatchToProps, dispatch is no longer injected. Only the actions we declared
in mapDispatchToprops are passed in. 
bindActionCreator aceptara un objeto, por lo que puede pasar todas sus acciones aqui. Y devolvera todos
envueltos, o simplemente puedes pasar una accion para envolverla. Todas nuestras acciones de Redux estan
bajo una sola actionsProp
*/
function mapDispatchToProps(dispatch){
  return {
    actions: {
      loadCourses: bindActionCreators(courseActions.loadCourses, dispatch),
      loadAuthors: bindActionCreators(authorActions.loadAuthors,dispatch)
    }
  };
}

/*Usamos connect para conectar nuestros componentes a redux, container components
toma dos parametros(mapstateprops, mpDispacthProps)(Component)
Connect returns a function, That function then calls our component
connect pasa automaticamente el envio si omitimos mapDispatchToProps
*/
export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
