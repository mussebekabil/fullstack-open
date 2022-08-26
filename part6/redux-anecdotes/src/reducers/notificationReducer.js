import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notifications',
  initialState: '',
  reducers: {
    createNotification(state, action) {
      return action.payload
    },
    removeNotification(state, action) {
      return ''
    }

  }
})

export const { createNotification, removeNotification } = notificationSlice.actions

export const setNotification = (message, timeout) => {
  return async dispatch => {
    dispatch(createNotification(message))
    setTimeout(() => {
      dispatch(removeNotification())
    }, timeout * 1000)
  }
}

export default notificationSlice.reducer
