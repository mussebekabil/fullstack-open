import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

describe('BlogForm component', () => {
  test('should create blog correctly', async () => {
    const mockHandleCreate = jest.fn()
    const user = userEvent.setup()
    const testBlog = {
      title: 'unit test blog title',
      author: 'test author',
      url: 'http://test-blog-url'
    }
    const { queryByText, getByRole } = render(
      <BlogForm handleCreate={mockHandleCreate} />
    )
    const title = getByRole('textbox', { name: 'Title' })
    const author = getByRole('textbox', { name: 'Author' })
    const url = getByRole('textbox', { name: 'Url' })
    const createButton = queryByText('create')

    await user.type(title, testBlog.title)
    await user.type(author, testBlog.author)
    await user.type(url, testBlog.url)
    await user.click(createButton)

    expect(mockHandleCreate).toHaveBeenCalledTimes(1)
    expect(mockHandleCreate).toHaveBeenCalledWith(expect.objectContaining(testBlog))

  })
})
