import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useMatch } from 'react-router-dom'
import { setNotification } from '../reducers/notificationReducer'
import { createBlogComment } from '../reducers/blogReducer'

const Comments = ({ comments }) => {
  const [comment, setComment] = useState('')
  const match = useMatch('/blogs/:id')
  const blogId = match.params.id
  const dispatch = useDispatch()

  const addBlogComment = async (e) => {
    try {
      e.preventDefault()
      await dispatch(createBlogComment(blogId, comment))
      setComment('')
    } catch (e) {
      const message = e.response.data.error || e.toString()
      dispatch(setNotification({ message, className: 'error' }))
    }
  }

  return (<div>
    <h3>comments</h3>
    <div>
      <input
        type="text"
        value={comment}
        aria-label="Comment"
        id="comment"
        onChange={({ target }) => setComment(target.value)}
      />
      <button id="add" onClick={addBlogComment}>add comment</button>
    </div>
    <ul>
      {comments.map((c, i) => (<li key={i}>{c}</li>))}
    </ul>
  </div>)
}

export default Comments
