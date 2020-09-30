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

return (
    <div>
      <Header course={course.name}/>
      <Content parts={course.parts}/>
      {/* <Total parts={course.parts}/> */}
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
// const Total = (props) => {
//   console.log(props)
//   return (
//     <div>
//         <p>Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}</p>
//     </div>
//   )
// }


ReactDOM.render(<App />, document.getElementById('root'))