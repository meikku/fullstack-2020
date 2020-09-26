import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array (anecdotes.length).fill(0))
  
  const handleAnecdoteClick = () => {
   setSelected(Math.floor((Math.random() * 6)))
  }

  const handleVoteClick = () => {
      const copy = [...votes]
      copy[selected] += 1
      setVotes(copy)
  }
  console.log("votes", votes)     
  return (
    <div>
      <h2>Anecdote of the day</h2>
      <div>
        {props.anecdotes[selected]}
      </div>
      <div>has {votes[selected]} votes</div>
      <button onClick = {handleVoteClick}>vote</button>
      <button onClick={handleAnecdoteClick}>next anecdote</button> 
       
      <h2>Anecdote with most votes</h2>
      <MostVoted votes = {votes} selected = {selected} anecdotes = {props.anecdotes}/>
    </div>
  )
}
const MostVoted = (props) => {
  console.log("entering MostVoted");
  let i 
  let mostVotes = 0
  let index = 0
  for (i = 0; i<= props.votes.length; i++)
  {
    if (props.votes[i] > mostVotes) {
      mostVotes = props.votes[i]
      index = i
      }
  }
  return (
    <div>
      {props.anecdotes[index]}
      <div>
        has {mostVotes} votes
      </div>
    </div>
    )  
  
}

const anecdotes = [
  'If it hurts, stop doing it',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]


ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
