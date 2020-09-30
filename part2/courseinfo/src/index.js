import React from 'react';
import ReactDOM from 'react-dom';

const App = () => {
  
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return <Course course={course} />
}

const Course = ( {course}) => {

  const total = course.parts.reduce((sum, part) => {
    return sum + part.exercises
   }, 0)
   

return (
    <div>
      <Header course={course.name}/>
      <Content parts={course.parts}/>
      <h4>Total of {total} exercises</h4>
    </div>
  ) 
}
const Header = ( {course}) => {
  return (
    <div>
      <h1>{course}</h1>
    </div>
  )
}
const Content = ( {parts}) => {

  return (
    <div> 
      <ul>
      {parts.map(part => 
        <Part key={part.id}
          part={part}/>
          )}
      </ul>
    </div>
  )
}
const Part = ({ part }) => {
  return (
    <li>
     {part.name} {part.exercises}
    </li>
  )
}


     
ReactDOM.render(<App />, document.getElementById('root'))