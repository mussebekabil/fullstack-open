import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notifications',
  initialState: null,
  reducers: {
    createNotification(state, action) {
      return action.payload
    },
    removeNotification() {
      return ''
    }

  }
})

export const { createNotification, removeNotification } = notificationSlice.actions

let timeoutId
export const setNotification = (notification, delay = 5) => {
  clearTimeout(timeoutId)
  return async dispatch => {
    dispatch(createNotification(notification))
    timeoutId = setTimeout(() => {
      dispatch(removeNotification())
    }, delay * 1000)

  }
}

export default notificationSlice.reducer
