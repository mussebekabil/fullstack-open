import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../reducers/loginReducer'
import {
  AppBar,
  Toolbar,
  IconButton,
  Button
} from '@mui/material'

const Header = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  const handleLogout = () => {
    dispatch(logout())
  }
  if(!user) return null
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
        </IconButton>
        <Button color="inherit" component={Link} to="/">
          home
        </Button>
        <Button color="inherit" component={Link} to="/blogs">
          blogs
        </Button>
        <Button color="inherit" component={Link} to="/users">
          users
        </Button>
        {user
          ? <em>{user.name} logged in <Button color="secondary" onClick={handleLogout}>logout</Button></em>
          : <Button color="inherit" component={Link} to="/login">
              login
          </Button>
        }
      </Toolbar>
    </AppBar>
  )
}

export default Header
