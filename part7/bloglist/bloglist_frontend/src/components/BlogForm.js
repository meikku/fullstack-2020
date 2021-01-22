import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Form, Button } from 'react-bootstrap'

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
    <div className='container'>
      <h4>Create new blog</h4>

      <Form onSubmit={addBlog}>
        <Form.Group>
        <Form.Label>
        title:</Form.Label>
          <Form.Control
            type="text"
            id='title'
            value={newTitle}
            onChange={handleTitleChange}
          />
        <Form.Label>
        author:</Form.Label>
          <Form.Control
            type="text"
            id='author'
            value={newAuthor}
            onChange={handleAuthorChange}
          />
        <Form.Label>
        url:</Form.Label>
          <Form.Control
            type="text"
            id='url'
            value={newUrl}
            onChange={handleUrlChange}
          />
        <Button variant='primary' id='create' type="submit">create</Button>
        </Form.Group>
      </Form>
    </div>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default BlogForm