import { useRef } from 'react'
import PropTypes from 'prop-types'
import Togglable from './Togglable'
import './Blog.css'

const Blog = ({ blog, user, handleLikes, handleDelete }) => {
  const blogRef = useRef()

  return (
    <div className="blog">
      {blog.title} {blog.author}
      <Togglable buttonLabel="view" cancelButtonLabel="hide" ref={blogRef}>
        <div>
          <p>{blog.url}</p>
          <p>likes {blog.likes} <button onClick={() => handleLikes(blog)}>like</button></p>
          {blog.user && <p>{blog.user.name}</p>}

          {blog.user && blog.user.username === user.username && <button onClick={() => handleDelete(blog)}>remove</button>}
        </div>
      </Togglable>
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
  }),
  handleLikes: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired
}

export default Blog
