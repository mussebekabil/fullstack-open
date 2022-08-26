import { createSlice } from '@reduxjs/toolkit'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      state.push(action.payload)
    },
    voteUp(state, action) {
      const id = action.payload
      const anecdote = state.find(a => a.id === id)
      const updatedAnecdote =  {
        ...anecdote, 
        votes: anecdote.votes + 1 
      }
      return state.map(a => a.id === id ? updatedAnecdote : a) 
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  },
})

export const { createAnecdote, voteUp, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer 
