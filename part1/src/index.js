import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const all = good + bad + neutral
  const average = (good - bad)/all
  const positive = good / all
 
  
  return (
    <div>
      <h1>Please give us your feedback!</h1>
      <button onClick = {() => setGood(good + 1)}>
        good
      </button>
      <button onClick = {() => setNeutral(neutral + 1)}>
        neutral
      </button>
      <button onClick = {() => setBad(bad + 1)}>
        bad
      </button>   
      <Statistics good={good} bad={bad} neutral={neutral} all={all} average={average} positive={positive}/>  
    </div>
  )
  }
  const Statistics = (props) => {
  if (props.all=== 0) {
  return (
    <div>
      <h1>statistics</h1>
      <p>No feedback given</p>
    </div>
        )}
        return (
          <div>
           <h1>statistics</h1> 
        <p>good: {props.good}</p>
        <p>neutral: {props.neutral}</p>
        <p>bad: {props.bad}</p>
        <p>all: {props.all} </p>
        <p>average: {props.average} </p>
        <p>positive {props.positive}%</p>
    </div>
  )
  }
   
ReactDOM.render(<App />, 
  document.getElementById('root')
)