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
        <button onClick={props.handleClick}>
          {props.text}
        </button>
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
      <table>
        <tbody>
        <tr>
            <td><Statistic text="good"/></td>
            <td> <Statistic value ={props.good}/> </td>
        </tr>
        <tr>
            <td><Statistic text="neutral" /></td>
            <td><Statistic value ={props.neutral} /></td>
        </tr>
        <tr>
          <td><Statistic text="bad"/></td>
          <td><Statistic value ={props.bad} /></td>
        </tr>
       <tr>
         <td> <Statistic text="all" /></td>
         <td> <Statistic value ={props.all} /></td>
       </tr>
       <tr>
         <td><Statistic text="average" /></td>
         <td><Statistic value ={props.average} /></td>
       </tr>
       </tbody>
    </table>
    
     
     
      
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