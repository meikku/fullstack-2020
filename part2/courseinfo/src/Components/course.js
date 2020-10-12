import React from 'react'

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
    

export default Course