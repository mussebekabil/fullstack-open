import { useRef } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Paper
} from '@mui/material'
import BlogForm from './BlogForm'
import Togglable from './Togglable'

const BlogsList = () => {
  const blogFormRef = useRef()
  const blogs = useSelector(({ blogs }) => blogs.slice().sort((a, b) => b.likes - a.likes))

  return (
    <div>
      <Togglable buttonLabel='create new blog' ref={blogFormRef}>
        <BlogForm />
      </Togglable>
      <TableContainer component={Paper}>
        <Table stickyHeader aria-label="sticky table">
          <TableBody>
            {blogs
              .map(blog => (
                <TableRow key={blog.id}>
                  <TableCell>
                    <Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author} </Link>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default BlogsList
