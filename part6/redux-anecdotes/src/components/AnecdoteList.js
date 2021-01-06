import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { showNotification, hideNotification } from '../reducers/notificationReducer'

const AnecdoteList = () =>  {
    const dispatch = useDispatch()
    const anecdotes = useSelector(state => state.anecdotes)
    const filter = useSelector(state => state.filter)

    const sortedAnecdotes = (filteredAnecdotes) => {
        return filteredAnecdotes.sort((a, b) => a.votes - b.votes)
      }

    const filteredAnecdotes = () => {
      return anecdotes.filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))
    }

    const voteForAnecdote = (id, content) => {
    dispatch(vote(id))
    dispatch(showNotification(`You voted '${content}'`))
    setTimeout(() => dispatch(hideNotification(null)), 5000)    
    }
      
    return (
      sortedAnecdotes(filteredAnecdotes()).map(anecdote =>
        <div key={anecdote.id}> 
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => voteForAnecdote(anecdote.id, anecdote.content)}>vote</button>
          </div>
        </div>
      )
    )
}

export default AnecdoteList
