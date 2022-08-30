import { useState } from 'react'
import { useDispatch } from 'react-redux'
import {
  Button,
  Card,
  TextField,
  Typography,
  CardContent
} from '@mui/material'
import { setNotification } from '../reducers/notificationReducer'
import { createBlog } from '../reducers/blogReducer'
const initialBlog = {
  title: '',
  author: '',
  url: ''
}

const BlogForm = () => {
  const [blog, setBlog] = useState(initialBlog)
  const dispatch = useDispatch()

  const addBlog = async (e) => {
    try {
      e.preventDefault()
      await dispatch(createBlog(blog))
      dispatch(setNotification({
        message: `a new blog ${blog.title} by ${blog.author} added`,
        className: 'success'
      }, 10))

      setBlog(initialBlog)
    } catch (e) {
      const message = e.response.data.error || e.toString()
      dispatch(setNotification({ message, className: 'error' }))
    }
  }

  return (
    <Card>
      <CardContent>
        <Typography component="h5" variant="h5">
          Create new
        </Typography>
        <form onSubmit={addBlog}>
          <div>
            <TextField
              variant="filled"
              fullWidth
              value={blog.title}
              label="Title"
              id="title"
              onChange={({ target }) => setBlog({ ...blog, title: target.value })}
            />
          </div>
          <div>
            <TextField
              variant="filled"
              fullWidth
              value={blog.author}
              label="Author"
              id="author"
              onChange={({ target }) => setBlog({ ...blog, author: target.value })}
            />
          </div>
          <div>
            <TextField
              variant="filled"
              fullWidth
              value={blog.url}
              label="Url"
              id="url"
              onChange={({ target }) => setBlog({ ...blog, url: target.value })}
            />
          </div>
          <Button id="create" variant="contained" color="primary" type="submit">create</Button>
        </form>
      </CardContent>
    </Card>
  )}

export default BlogForm
