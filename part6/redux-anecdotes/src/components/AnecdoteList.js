import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'

const AnecdoteList = () =>  {
    const dispatch = useDispatch()
    const anecdotes = useSelector(state => state)

    const sortedAnecdotes = (anecdotes) => {
        return anecdotes.sort((a, b) => a.votes - b.votes)
      }
      
return (
  sortedAnecdotes(anecdotes).map(anecdote =>
    <div key={anecdote.id}> 
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={() => dispatch(vote(anecdote.id))}>vote</button>
      </div>
    </div>
  )
)
}

export default AnecdoteList
