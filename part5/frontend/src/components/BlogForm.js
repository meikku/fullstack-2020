import React, { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {
  const [ newTitle, setNewTitle ] = useState('')
  const [ newAuthor, setNewAuthor ] = useState('')
  const [ newUrl, setNewUrl ] = useState('')


  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setNewUrl(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl
    })

    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return (
    <div className='blogForm'>
      <h2>Create new blog</h2>

      <form onSubmit={addBlog}>
        <div>
        title:
          <input
            type="text"
            id='title'
            value={newTitle}
            onChange={handleTitleChange}
          />
        </div>
        <div>
        author:
          <input
            type="text"
            id='author'
            value={newAuthor}
            onChange={handleAuthorChange}
          />
        </div>
        <div>
        url:
          <input
            type="text"
            id='url'
            value={newUrl}
            onChange={handleUrlChange}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default BlogForm