import React from 'react';
import Course from './Components/course'

const App = ( { props.courses}) => {


  return (
    <div>
        <h2>Web development curriculum</h2>
        <ul>
          {courses.map(course => 
          <Course key={course.id}
          course={course}/>
        )}
      </ul>
    </div>
  )
  }


export default App;
