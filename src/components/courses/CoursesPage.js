import React from "react";

class CoursesPage extends React.Component {
  state = {
    course: {
      title: "",
    }
  };

  /*field class, arrow functions inherit the binding context of their enclosing scope
  keyword this hace referencia a nuestra instancia de clase, usar este enfoque para evitar
  problemas de enlace en los controladores de eventos en los componentes de clase
  copia del estado (inmutable), le hicimos un cambio y luego llamamos a setState con ese nuevo objeto*/
  handleChange = event => {
    const course = { ...this.state.course, title: event.target.value };
    this.setState({ course });
  };

  /*field class, arrow function evitar problema de enlace controladores de eventos & component class
  evitar que pagina reload*/
  handleSubmit = event => {
    event.preventDefault();
    alert(this.state.course.title);
  }

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

export default CoursesPage;
