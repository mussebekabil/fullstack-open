import { useDispatch, useSelector } from 'react-redux'
import { useMatch } from 'react-router-dom'
import { setNotification } from '../reducers/notificationReducer'
import { deleteBlog, likeBlog } from '../reducers/blogReducer'
import PropTypes from 'prop-types'
import Comments from './Comments'

const Blog = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const match = useMatch('/blogs/:id')
  const blogId = match.params.id
  const blogs = useSelector(state => state.blogs)
  const blog = blogs ? blogs.find(b => b.id === blogId) : null

  const handleDelete = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      try {
        await dispatch(deleteBlog(blog.id))
        dispatch(setNotification({
          message: `Deleted blog ${blog.title} by ${blog.author}`,
          className: 'success'
        }))
      } catch (e) {
        const message = e.response.data.error || e.toString()
        dispatch(setNotification({ message, className: 'error' }))
      }
    }
  }

  const handleLikes = async () => {
    try {
      await dispatch(likeBlog(blog))
    } catch (e) {
      const message = e.response.data.error || e.toString()
      dispatch(setNotification({ message, className: 'error' }))
    }
  }

  if(!blog) return null
  return (
    <div>
      <h2>{blog.title} {blog.author}</h2>
      <div>
        <p>{blog.url}</p>
        <p>{blog.likes} likes <button id="like-btn" onClick={handleLikes}>like</button></p>
        {blog.user && <p> added {blog.user.name}</p>}

        {blog.user && blog.user.username === user.username && <button id="delete-btn" onClick={handleDelete}>remove</button>}
        {blog.comments.length > 0 && <Comments comments={blog.comments}/>}
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    author: PropTypes.string,
    url: PropTypes.string,
    user: PropTypes.shape({
      username: PropTypes.string,
      name: PropTypes.string,
      id: PropTypes.string
    })
  }),
  user: PropTypes.shape({
    username: PropTypes.string,
    name: PropTypes.string,
    token: PropTypes.string
  })
}

export default Blog
