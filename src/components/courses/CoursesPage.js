import React from "react";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
import PropTypes from "prop-types";

class CoursesPage extends React.Component {
  state = {
    course: {
      title: "",
    },
  };

  /*field class, arrow functions inherit the binding context of their enclosing scope
  keyword this hace referencia a nuestra instancia de clase, usar este enfoque para evitar
  problemas de enlace en los controladores de eventos en los componentes de clase
  copia del estado (inmutable), le hicimos un cambio y luego llamamos a setState con ese nuevo objeto*/
  handleChange = (event) => {
    const course = { ...this.state.course, title: event.target.value };
    this.setState({ course });
  };

  /*field class, arrow function evitar problema de enlace controladores de eventos & component class
  evitar que pagina reload
  Dispatch: permite despachar nuestras acciones
  */
  handleSubmit = (event) => {
    event.preventDefault();
    this.props.dispatch(courseActions.createCourse(this.state.course)); 
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h2>Courses</h2>
        <h3>Add course</h3>
        <input
          type="text"
          onChange={this.handleChange}
          value={this.state.course.title}
        ></input>
        <input type="submit" value="Save"></input>
      </form>
    );
  }
}

/*Nos ayuda a especificar lo que nuestro componente acepta.
Ahora hemos aclarado que esperamos que el envio se pase al componente.
*/
CoursesPage.propTypes = {
  dispatch: PropTypes.func.isRequired
};

/*this func determines what state is passed to our component via props (exponemos a nuestro componente)
Y recibe dos argumentos. Por ahora la tienda es simple, devuelve solo cursos fuera del estado.
Al declarar mapStateToprops se lo mas especifico posible, acerca de que datos expone al componente,
solo los datos que el componente necesita 
OwnProps: es una referencia a los propios accesorios del componente*/
function mapStateToProps(state) {
  return {
    courses: state.courses,
  };
}


/*mapDispatchToPropsThis lets us declare what actions to pass to our component on props
cuando omitimos este parametro, nuestro componente obtiene una propiedad de envio
inyectada automaticamente. Asi que podamos usarlo para despachar nuestras acciones. 
*/


/*Usamos connect para conectar nuestros componentes a redux, container components
toma dos parametros(mapstateprops, mpDispacthProps)(Component)
Connect returns a function, That function then calls our component
connect pasa automaticamente el envio si omitimos mapDispatchToProps
*/
export default connect(mapStateToProps)(CoursesPage);
