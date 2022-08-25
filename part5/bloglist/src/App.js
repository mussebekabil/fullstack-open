import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import { getAll, setToken, create, update, deleteBlog } from './services/blogs'
import { login } from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)
  const blogFormRef = useRef()

  useEffect(() => {
    getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      setToken(user.token)
    }
  }, [])

  const prepareNotification = (message, className) => {
    setNotification ({ message, className })
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const handleLikes = async (blog) => {
    try {
      const updatedBlog = await update(blog.id, {
        ...blog,
        likes: blog.likes + 1
      })

      setBlogs(blogs.map(b => b.id !== updatedBlog.id ? b : updatedBlog))
    } catch (e) {
      const message = e.response.data.error || e.toString()
      setNotification(message, 'error')
    }
  }
  const handleLogin = async(e) => {
    e.preventDefault()
    try {
      const user = await login({
        username, password,
      })
      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))
      setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (e) {
      const message = e.response.data.error || e.toString()
      prepareNotification(message, 'error')
    }
  }

  const handleCreateBlog = async (blog) => {
    try {
      const createdBlog = await create(blog)
      blogFormRef.current.toggleVisibility()
      setBlogs([...blogs, createdBlog])
      prepareNotification(
        `a new blog ${createdBlog.title} by ${createdBlog.author} added`,
        'success'
      )
    } catch (e) {
      const message = e.response.data.error || e.toString()
      prepareNotification(message, 'error')
    }
  }

  const handleDeleteBlog = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      try {
        await deleteBlog(blog.id)
        setBlogs(blogs.filter(b => b.id !== blog.id))
        prepareNotification(
          `Deleted blog ${blog.title} by ${blog.author}`,
          'success'
        )
      } catch (e) {
        const message = e.response.data.error || e.toString()
        prepareNotification(message, 'error')
      }
    }
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('loggedBlogUser')
  }

  const renderLoginForm = () => (
    <div>
      <h2>login to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id="login-btn" type="submit">login</button>
      </form>
    </div>
  )

  const renderBlogs = () => (
    <div>
      <h2>blogs</h2>

      <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>

      <Togglable buttonLabel='create new blog' ref={blogFormRef}>
        <BlogForm
          handleCreate={handleCreateBlog}
        />
      </Togglable>

      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map(blog =>
          <Blog key={blog.id} blog={blog} user={user} handleLikes={handleLikes} handleDelete={handleDeleteBlog}/>
        )}
    </div>
  )

  return (
    <div>

      <Notification notification={notification} />

      {user === null ? renderLoginForm() : renderBlogs()}
    </div>
  )
}

export default App
