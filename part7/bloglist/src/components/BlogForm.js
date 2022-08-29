import { useState } from 'react'
import { useDispatch } from 'react-redux'
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
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          title :
          <input
            type="text"
            value={blog.title}
            aria-label="Title"
            id="title"
            onChange={({ target }) => setBlog({ ...blog, title: target.value })}
          />
        </div>
        <div>
          author :
          <input
            type="text"
            value={blog.author}
            aria-label="Author"
            id="author"
            onChange={({ target }) => setBlog({ ...blog, author: target.value })}
          />
        </div>
        <div>
          url :
          <input
            type="text"
            value={blog.url}
            aria-label="Url"
            id="url"
            onChange={({ target }) => setBlog({ ...blog, url: target.value })}
          />
        </div>
        <button id="create" type="submit">create</button>
      </form>
    </div>
  )}

export default BlogForm
