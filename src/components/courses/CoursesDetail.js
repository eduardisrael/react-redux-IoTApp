import React from "react";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
import * as authorActions from "../../redux/actions/authorActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import Content from "./Content";
import Spinner from "../common/Spinner";

class CoursesDetail extends React.Component {

  componentDidMount() {
    //destructuracion
    const { courses, authors, actions } = this.props;

    //valida que carga cursos una sola vez, mejora performance(eficiente),no hacemos solicitudes adicionales.
    if (courses.length === 0) {
      actions.loadCourses().catch((error) => {
        alert("Error cargando cursos" + error);
      });
    }

    if (authors.length === 0) {
      actions.loadAuthors().catch((error) => {
        alert("Error cargando autores" + error);
      });
    }
  }


  render() {
    return (
      <>
        <h2>Le damos la bienvenida, Israel</h2>
        {this.props.loading ? (
          <Spinner />
        ) : (
          <>
            <Content
              courses={this.props.courses}
            />
          </>
        )}
      </>
    );
  }
}

/*Nos ayuda a especificar lo que nuestro componente acepta.
Ahora hemos aclarado que esperamos que el envio se pase al componente.
*/
CoursesDetail.propTypes = {
  authors: PropTypes.array.isRequired,
  courses: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
};


function mapStateToProps(state) {
  return {
    courses:
      state.authors.length === 0
        ? []
        : state.courses.map((course) => {
            return {
              ...course,
              authorName: state.authors.find((a) => a.id === course.authorId)
                .name,
            };
          }),
    authors: state.authors,
    loading: state.apiCallsInProgress > 0,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loadCourses: bindActionCreators(courseActions.loadCourses, dispatch),
      loadAuthors: bindActionCreators(authorActions.loadAuthors, dispatch),
      deleteCourse: bindActionCreators(courseActions.deleteCourse, dispatch),
    },
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(CoursesDetail);

