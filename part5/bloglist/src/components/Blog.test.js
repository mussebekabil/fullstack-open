import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('Blog component', () => {
  const testBlog = {
    title: 'Unit Test',
    author: 'Alan Bob',
    url: 'https://test-blog-url.com/',
    likes: 4
  }
  test('renders title and author, but not its url or number of likes by default', () => {
    const { queryByText } = render(<Blog blog={testBlog} />)
    
    expect(queryByText(`${testBlog.title} ${testBlog.author}`)).toBeVisible()
    expect(queryByText(testBlog.url)).not.toBeVisible()
    expect(queryByText(`likes ${testBlog.likes}`)).not.toBeVisible()
  })

  test('toggle view button should show blog url and number of likes', async () => {
    const { queryByText } = render(<Blog blog={testBlog} />)
  
    expect(queryByText(testBlog.url)).not.toBeVisible()
    expect(queryByText(`likes ${testBlog.likes}`)).not.toBeVisible()

    const user = userEvent.setup()
    const button = queryByText('view')
    await user.click(button)
    
    expect(queryByText(testBlog.url)).toBeVisible()
    expect(queryByText(`likes ${testBlog.likes}`)).toBeVisible()
  })

  test('clicking like button should work as expected', async () => {
    const mockHandler = jest.fn()
    const { queryByText } = render(<Blog blog={testBlog} handleLikes={mockHandler} />)
  
    const user = userEvent.setup()
    const viewButton = queryByText('view')
    await user.click(viewButton)

    const likeButton = queryByText('like')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(mockHandler).toHaveBeenCalledTimes(2)
    expect(mockHandler).toHaveBeenCalledWith(expect.objectContaining(testBlog))
  })
})
