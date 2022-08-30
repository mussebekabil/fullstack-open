import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/user'

const userSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    setUsers(state, action) {
      return action.payload
    }
  },
})
export const { setUsers } = userSlice.actions
export const initializeUsers = () => {
  return async dispatch => {
    const users = await userService.getAll()
    dispatch(setUsers(users))
  }
}

export const getSingleUser = (id) => {
  return async dispatch => {
    const user = await userService.getById(id)
    dispatch(setUsers(user))
  }
}

export default userSlice.reducer
