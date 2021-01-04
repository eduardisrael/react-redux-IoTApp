import React from "react";

class CoursesPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      course: {
        title: "",
      },
    };

    //Preferible vinculacion en el constructor, funcion vinculada una sola vez por lo que
    //no reasignara en cada render
    this.handleChange = this.handleChange.bind(this);
  }

  //copia del estado (inmutable), le hicimos un cambio y luego llamamos a setState con ese nuevo objeto
  handleChange(event){
      const course = { ...this.state.course, title: event.target.value }
      this.setState({course});
  }

  render() {
    return (
      <form>
        <h2>Courses</h2>
        <h3>Add course</h3>
        <input
          type="text"
          onChange={this.handleChange.bind}
          value={this.state.course.title}
        ></input>
        <input type="submit" value="Save"></input>
      </form>
    );
  }
}

export default CoursesPage;
