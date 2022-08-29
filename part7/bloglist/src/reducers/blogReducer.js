import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    appendBlog(state, action) {
      state.push(action.payload)
    },
    like(state, action) {
      const { blog } = action.payload
      return state.map(b => b.id === blog.id ? blog : b)
    },
    setBlogs(state, action) {
      return action.payload
    },
    deleteB(state, action) {
      const { id } = action.payload
      return state.filter(b => b.id !== id)
    },
    appendBlogComment(state, action) {
      const { blog } = action.payload
      return state.map(b => b.id === blog.id ? blog : b)
    }
  },
})

export const { appendBlog, like, setBlogs, deleteB, appendBlogComment } = blogSlice.actions
export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = content => {
  return async dispatch => {
    const newBlog = await blogService.create(content)
    dispatch(appendBlog(newBlog))
  }
}
export const likeBlog = (blog) => {
  return async dispatch => {
    const updatedBlog = await blogService.update(blog.id, {
      ...blog,
      likes: blog.likes + 1
    })
    dispatch(like({ blog: updatedBlog }))
  }
}

export const deleteBlog = (id) => {
  return async dispatch => {
    await blogService.deleteBlog(id)
    dispatch(deleteB({ id }))
  }
}

export const createBlogComment = (id, comment) => {
  return async dispatch => {
    const updatedBlog = await blogService.addComment(id, comment)
    dispatch(appendBlogComment({ blog: updatedBlog }))
  }
}
export default blogSlice.reducer
