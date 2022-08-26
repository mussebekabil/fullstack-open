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

let timeoutId;
export const setNotification = (message, delay) => {
  clearTimeout(timeoutId)
  return async dispatch => {
    dispatch(createNotification(message))
    timeoutId = setTimeout(() => {
      dispatch(removeNotification())
    }, delay * 1000)
    
  }
}

export default notificationSlice.reducer
