import { createSlice } from '@reduxjs/toolkit'
import { getAll, create, update } from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    voteUp(state, action) {
      const { id, anecdote } = action.payload
      return state.map(a => a.id === id ? anecdote : a) 
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  },
})

export const { appendAnecdote, voteUp, setAnecdotes } = anecdoteSlice.actions
export const initializeAnecdotes = () => {
  return async dispatch => {
    const notes = await getAll()
    dispatch(setAnecdotes(notes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await create(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}
export const voteAnecdote = (id, anecdote) => {
  return async dispatch => {
    const updatedAnecdote = await update(id, anecdote)
    dispatch(voteUp({ id, anecdote: updatedAnecdote }))
  }
}
export default anecdoteSlice.reducer 
