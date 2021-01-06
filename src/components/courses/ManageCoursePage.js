import React from "react";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
import * as authorActions from "../../redux/actions/authorActions";
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

/*lets use the object form of mapDispatchToProps to simplify our code*/
const mapDispatchToProps = {
  loadCourses: courseActions.loadCourses,
  loadAuthors: authorActions.loadAuthors
};


/*Redux connect*/
export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);
