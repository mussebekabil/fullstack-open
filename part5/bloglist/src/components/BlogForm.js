import { useState } from 'react'
import PropTypes from 'prop-types'

const initialBlog = {
  title: '',
  author: '',
  url: ''
}

const BlogForm = ({ handleCreate }) => {
  const [blog, setBlog] = useState(initialBlog)
  
  const createBlog = async (e) => {
    e.preventDefault()
    
    await handleCreate(blog)

    setBlog(initialBlog)
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={createBlog}>
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

BlogForm.propTypes = {
  handleCreate: PropTypes.func.isRequired
}
export default BlogForm
