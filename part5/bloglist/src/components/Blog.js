import { useRef } from 'react'
import Togglable from './Togglable'
import './Blog.css'

const Blog = ({blog, user, handleLikes, handleDelete}) => {
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

export default Blog
