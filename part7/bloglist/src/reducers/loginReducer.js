import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import loginService from '../services/login'

const loginSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload
    }
  },
})
export const { setUser } = loginSlice.actions
export const initializeUser = () => {
  return dispatch => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      dispatch(setUser(user))
    }
  }
}

export const login = credentials => {
  return async dispatch => {
    const loggedInUser = await loginService.login(credentials)
    window.localStorage.setItem('loggedBlogUser', JSON.stringify(loggedInUser))
    blogService.setToken(loggedInUser.token)
    dispatch(setUser(loggedInUser))
  }
}
export const logout = () => {
  return async dispatch => {
    window.localStorage.removeItem('loggedBlogUser')
    dispatch(setUser(null))
  }
}
export default loginSlice.reducer
