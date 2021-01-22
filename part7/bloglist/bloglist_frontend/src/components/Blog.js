import React, { useState } from 'react'
import { Button } from 'react-bootstrap'

const Blog = ({ blog, changeLikes, removeBlog, user }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const [detailsVisible, setDetailsVisible] = useState(false)
  const hideWhenVisible = { display: detailsVisible ? 'none' : '' }
  const showWhenVisible = { display: detailsVisible ? '' : 'none' }

  const handleLikes = () => {
    const likedBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      id: blog.id,
      user: blog.user.id
    }
    changeLikes(likedBlog.id, likedBlog)
  }
  const handleDelete = () => {
    const blogToRemove = {
      user: blog.user.id,
      id: blog.id
    }
    removeBlog(blogToRemove.id, blogToRemove)
  }
  const showDeleteButton = ({ blog, user }) => {
    if (user === null)
    {
      return
    }
    if (user.name === blog.user.name) {
      return <Button variant='danger' id='remove' onClick={() => {handleDelete()}}>remove</Button>
    }
  }

  return (
    <div id='blogs' style={blogStyle} className='blog'>
      <div style={hideWhenVisible} className='blogBasics'>
        <p id='title'>{blog.title} {blog.author}<Button variant='info' id='view' onClick ={() => setDetailsVisible(true)}>view</Button></p>

      </div>
      <div style={showWhenVisible} className='blogsInDetail'>
        <p id='title'>{blog.title} {blog.author}<Button variant='info' onClick ={() => setDetailsVisible(false)}>hide</Button></p>
        <p>{blog.url}</p>
        <p id='like'>{blog.likes}<Button variant='secondary' id='like' onClick={() => {handleLikes()}}>like</Button></p>
        <p>{blog.user.name}</p>
        {showDeleteButton({ blog, user })}
      </div>
    </div>
  )
}

export default Blog
