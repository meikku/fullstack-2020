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
      <Button handleClick = {() => setGood(good + 1)}
        text="good"/>
      <Button handleClick = {() => setNeutral(neutral + 1)}
        text="neutral"/>
      <Button handleClick = {() => setBad(bad + 1)}
        text="bad" />   
      <h1>statistics</h1>
      <Statistics all={all} good={good} neutral={neutral} bad={bad} average={average} positive={positive}/>
    </div>
  )
  }
  const Button = (props) => {
    console.log(props)
    return(
      <div>
        <button onClick={props.handleClick}>
          {props.text}
        </button>
      </div>
    )
  }
  const Statistics = (props) => {
    if (props.all=== 0) {
      return (     
        <div>
          <p>No feedback given</p>
        </div>
      )
      }
  
  return (
    <div>
      <Statistic text="good" value ={props.good} />
      <Statistic text="neutral" value ={props.neutral} />
      <Statistic text="bad" value ={props.bad} />
      <Statistic text="all" value ={props.all} />
      <Statistic text="average" value ={props.average} />
      <Statistic text="positive" value ={props.positive} />
    </div>
    )
  }
  const Statistic = (props) => {
    return (
      <div>
  {props.text}{" "}{props.value}
      </div>
    )
  }
   
ReactDOM.render(<App />, 
  document.getElementById('root')
)