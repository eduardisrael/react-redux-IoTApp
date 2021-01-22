import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const CourseList = ({ courses, onDeleteClick }) => (
  <table className="table">
    <thead>
      <tr>
        <th />
        <th>Título</th>
        <th>Autor</th>
        <th>Categoría</th>
        <th />
      </tr>
    </thead>
    <tbody>
      {courses.map((course) => {
        return (
          <tr key={course.id}>
            <td>
              <a
                className="btn btn-light"
                href={"detail/" + course.slug}
              >
                Ver
              </a>
            </td>
            <td>
              <Link to={"/course/" + course.slug}>{course.title}</Link>
            </td>
            <td>{course.authorName}</td>
            <td>{course.category}</td>
            <td>
              <button
                className="btn btn-outline-danger"
                onClick={() => onDeleteClick(course)}
              >
                Eliminar
              </button>
            </td>
          </tr>
        );
      })}
    </tbody>
  </table>
);

CourseList.propTypes = {
  courses: PropTypes.array.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
};

export default CourseList;
