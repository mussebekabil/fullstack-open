import { useRef } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import BlogForm from './BlogForm'
import Togglable from './Togglable'
import './BlogList.css'

const BlogsList = () => {
  const blogFormRef = useRef()
  const blogs = useSelector(({ blogs }) => blogs.slice().sort((a, b) => b.likes - a.likes))

  return (
    <div>
      <Togglable buttonLabel='create new blog' ref={blogFormRef}>
        <BlogForm />
      </Togglable>

      {blogs
        .map(blog => (
          <div className="blog" key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author} </Link>
          </div>
        ))}
    </div>
  )
}

export default BlogsList
