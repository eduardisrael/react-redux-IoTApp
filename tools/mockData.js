const courses = [
  {
    id: 1,
    title: "App Engine: Qwik Start - Python",
    slug: "app-engine-python",
    authorId: 1,
    category: "Python"
  },
  {
    id: 2,
    title: "Architecting Applications for the Real World",
    slug: "architecting-applications-dotnet",
    authorId: 1,
    category: "Software Architecture"
  },
  {
    id: 3,
    title: "Clean Code: Writing Code for Humans",
    slug: "writing-clean-code-humans",
    authorId: 1,
    category: "Software Practices"
  },
  {
    id: 4,
    title: "Web Component Fundamentals",
    slug: "web-components-shadow-dom",
    authorId: 1,
    category: "HTML5"
  }
];

const authors = [
  { id: 1, name: "Israel Pasaca" },
  { id: 2, name: "Juan Vallejo" },
  { id: 3, name: "Alexander Alzate" }
];

const newCourse = {
  id: null,
  title: "",
  authorId: null,
  category: ""
};

// Using CommonJS style export so we can consume via Node (without using Babel-node)
module.exports = {
  newCourse,
  courses,
  authors
};
