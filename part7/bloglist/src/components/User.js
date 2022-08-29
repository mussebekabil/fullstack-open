
import { useSelector } from 'react-redux'
import { useMatch } from 'react-router-dom'

const User = () => {
  const match = useMatch('/users/:id')
  const userId = match.params.id
  const users = useSelector(state => state.users)
  const user = users ? users.find(u => u.id === userId) : null

  if(!user) return null

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map(b => (
          <li key={b.id}>{b.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default User
