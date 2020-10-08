import React from 'react';
import ReactDOM from 'react-dom';

const App = () => {
const courses = [
  {
    name: 'Half Stack application development',
    id: 1,
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
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      }
    ]
  }, 
  {
    name: 'Node.js',
    id: 2,
    parts: [
      {
        name: 'Routing',
        exercises: 3,
        id: 1
      },
      {
        name: 'Middlewares',
        exercises: 7,
        id: 2
      }
    ]
  }
]

return (
  <div>
    <ul>
      <h2>Web development curriculum</h2>
      {courses.map(course => 
      <Course key={course.id}
      course={course}/>
      )}
    </ul>
  </div>
)
}


const Course = ( {course}) => {
return (
    <div>
      <Header course={course.name}/>
      <Content parts={course.parts}/>
      <Total parts = {course.parts}/>
    </div>
  ) 
}

const Total = ( {parts}) => {
  const total = parts.reduce((sum, part) => {
    return sum + part.exercises
   }, 0)
  return (
    <h4>
      total of {total} exercises
    </h4>
  )
}


const Header = ( {course}) => {
  return (
    <div> 
    <h3>
      {course}
    </h3>
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