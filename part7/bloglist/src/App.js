import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Routes, Route } from 'react-router-dom'
import { Container } from '@mui/material'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogsList from './components/BlogsList'
import Users from './components/Users'
import User from './components/User'
import Blog from './components/Blog'
import Header from './components/Header'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUser } from './reducers/loginReducer'
import { initializeUsers } from './reducers/userReducer'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUser())
    dispatch(initializeUsers())
  }, [dispatch]
  )

  return (
    <Container>
      <Header />

      <h2>Blog App</h2>

      <Notification />

      {user === null ? <LoginForm /> : (
        <Routes>
          <Route path="/blogs/:id" element={<Blog />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<User />} />
          <Route path="/blogs" element={<BlogsList />} />
          <Route path="/" element={<BlogsList />} />
        </Routes>
      )}

    </Container>
  )
}

export default App
