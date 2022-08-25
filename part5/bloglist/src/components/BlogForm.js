import PropTypes from 'prop-types'
const BlogForm = ({ blog, setBlog, handleCreate }) => (
  <div>
    <h2>create new</h2>
    <form onSubmit={handleCreate}>
      <div>
        title :
        <input
          type="text"
          value={blog.title}
          name="Title"
          onChange={({ target }) => setBlog({ ...blog, title: target.value })}
        />
      </div>
      <div>
        author :
        <input
          type="text"
          value={blog.author}
          name="Author"
          onChange={({ target }) => setBlog({ ...blog, author: target.value })}
        />
      </div>
      <div>
        url :
        <input
          type="text"
          value={blog.url}
          name="Url"
          onChange={({ target }) => setBlog({ ...blog, url: target.value })}
        />
      </div>
      <button type="submit">create</button>
    </form>
  </div>
)

BlogForm.propTypes = {
  blog: PropTypes.shape({
    title: PropTypes.string,
    author: PropTypes.string,
    url: PropTypes.string
  }) ,
  setBlog: PropTypes.func.isRequired,
  handleCreate: PropTypes.func.isRequired
}
export default BlogForm
