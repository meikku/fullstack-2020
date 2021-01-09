import React from 'react'
import { connect } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) =>  {
    const anecdotes = props.anecdotes
    const filter = props.filter

    const sortedAnecdotes = (filteredAnecdotes) => {
        return filteredAnecdotes.sort((a, b) => a.votes - b.votes)
      }

    const filteredAnecdotes = () => {
      return anecdotes.filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))
    }

    const voteForAnecdote = async(anecdote) => {
    props.vote(anecdote)
    props.showNotification(`You voted '${anecdote.content}'`, 10)    
    }
      
    return (
      sortedAnecdotes(filteredAnecdotes()).map(anecdote =>
        <div key={anecdote.id}> 
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => voteForAnecdote(anecdote)}>vote</button>
          </div>
        </div>
      )
    )
}
const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
    filter: state.filter,
  }
}

const mapDispatchToProps = {
  vote, showNotification
}

const ConnectedAnecdotes = connect(
  mapStateToProps, 
  mapDispatchToProps
  )(AnecdoteList)

export default ConnectedAnecdotes
