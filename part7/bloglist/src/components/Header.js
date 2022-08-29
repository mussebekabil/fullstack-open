import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../reducers/loginReducer'
const Menu = () => {
  const padding = {
    paddingRight: 5
  }
  return (
    <div>
      <Link to='/' style={padding}>blogs</Link>
      <Link to='/users' style={padding}>users</Link>
    </div>
  )
}

const Header = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  const handleLogout = () => {
    dispatch(logout())
  }
  if(!user) return null
  return (
    <div>
      <div><Menu /> {user.name} logged in <button onClick={handleLogout}>logout</button></div>

      <h2>blog app</h2>

    </div>
  )
}

export default Header
