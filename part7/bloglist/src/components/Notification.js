import { useSelector } from 'react-redux'
import { Alert } from '@mui/material'

const Notification = () => {
  const notification = useSelector(state => state.notification)

  if (notification === null) {
    return null
  }

  return (
    <div>
      {notification &&
        <Alert severity={notification.className}>
          {notification.message}
        </Alert>
      }
    </div>
  )
}

export default Notification
