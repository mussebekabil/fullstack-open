import { useState } from 'react'
import { useDispatch } from 'react-redux'
import {
  Button,
  Card,
  TextField,
  CardContent,
  Typography
} from '@mui/material'
import { setNotification } from '../reducers/notificationReducer'
import { login } from '../reducers/loginReducer'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()

  const handleLogin = async(e) => {
    e.preventDefault()
    try {
      await dispatch(login({
        username, password,
      }))

      setUsername('')
      setPassword('')
    } catch (e) {
      const message = e.response.data.error || e.toString()
      console.log(message)
      dispatch(setNotification({ message, className: 'error' }))
    }
  }

  return (
    <Card>
      <CardContent>
        <Typography component="h5" variant="h5">
          Login to application
        </Typography>
        <form onSubmit={handleLogin}>
          <div>
            <TextField
              variant="filled"
              fullWidth
              value={username}
              label="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            <TextField
              variant="filled"
              fullWidth
              type="password"
              value={password}
              label="Password"
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <Button id="login-btn" variant="contained" color="primary" type="submit">login</Button>
        </form>
      </CardContent>
    </Card>
  )
}

export default LoginForm
