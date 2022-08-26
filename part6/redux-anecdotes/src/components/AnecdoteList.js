import { useSelector, useDispatch } from 'react-redux'
import { voteUp } from '../reducers/anecdoteReducer'
import { createNotification, removeNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(({ filter, anecdotes }) => {
    return filter === ''
      ? anecdotes
      : anecdotes.filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))
  })

  const dispatch = useDispatch()
  const vote = (anecdote) => {
    dispatch(voteUp(anecdote.id))
    dispatch(createNotification(`you voted '${anecdote.content}'`))
    setTimeout(() => {
      dispatch(removeNotification(''))
    }, 5000)
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
