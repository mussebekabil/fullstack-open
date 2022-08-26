import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(({ filter, anecdotes }) => {
    return filter === ''
      ? anecdotes
      : anecdotes.filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))
  })

  const dispatch = useDispatch()
  const vote = (anecdote) => {
    const updatedAnecdote =  {
      ...anecdote, 
      votes: anecdote.votes + 1 
    }
    dispatch(voteAnecdote(anecdote.id, updatedAnecdote))
    dispatch(setNotification(`you voted '${anecdote.content}'`, 5))
  }
  const sortedList = [...anecdotes].sort((a, b) => b.votes - a.votes)
  return (
    <div>
      {sortedList
        .map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote)}>vote</button>
            </div>
          </div>
        )}
    </div>
  )
}

export default AnecdoteList
