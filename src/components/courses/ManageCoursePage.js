import React from "react";
import { connect } from "react-redux";
import { loadCourses} from "../../redux/actions/courseActions";
import { loadAuthors } from "../../redux/actions/authorActions";
import PropTypes from "prop-types";

class ManageCoursePage extends React.Component {
  componentDidMount() {
    //destructuracion
    const { courses, authors, loadAuthors, loadCourses } = this.props;

    //valida que carga cursos una sola vez, mejora performance(eficiente),no hacemos solicitudes adicionales.
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
  }

  render() {
    return (
      <>
        <h2>Manage Course</h2>
      </>
    );
  }
}

ManageCoursePage.propTypes = {
  authors: PropTypes.array.isRequired,
  courses: PropTypes.array.isRequired,
  loadCourses: PropTypes.func.isRequired,
  loadAuthors: PropTypes.func.isRequired
};

/*determinan a que estado y acciones nos gustaria acceder en nuestro componente, Redux Mapping*/
function mapStateToProps(state) {
  return {
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
  loadAuthors
};

/*Redux connect*/
export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);
