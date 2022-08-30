
import { useSelector } from 'react-redux'
import { useMatch } from 'react-router-dom'
import {
  Card,
  Typography,
  CardContent
} from '@mui/material'

const User = () => {
  const match = useMatch('/users/:id')
  const userId = match.params.id
  const users = useSelector(state => state.users)
  const user = users ? users.find(u => u.id === userId) : null

  if(!user) return null

  return (
    <Card>
      <CardContent>
        <Typography component="h5" variant="h5">
          {user.name}
        </Typography>
        <Typography component="h6" variant="h6">
          added blogs
        </Typography>
        <ul>
          {user.blogs.map(b => (
            <li key={b.id}>{b.title}</li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

export default User
