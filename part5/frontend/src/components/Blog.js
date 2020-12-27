import React, { useState } from 'react'

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
    console.log('user.name', user.name)
    console.log('blog.user.name', blog.user.name)
    if (user.name === blog.user.name) {
      return <button onClick={() => {handleDelete()}}>remove</button>
    }
    else return null
  }

  return (
    <div style={blogStyle} >
      <div style={hideWhenVisible} className='blogBasics'>
        <p >{blog.title} {blog.author}<button onClick ={() => setDetailsVisible(true)}>view</button></p>

      </div>
      <div style={showWhenVisible} className='blogsInDetail'>
        <p>{blog.title} {blog.author}<button onClick ={() => setDetailsVisible(false)}>hide</button></p>
        <p>{blog.url}</p>
        <p>{blog.likes}<button onClick={() => {handleLikes()}}>like</button></p>
        <p>{blog.user.name}</p>
        {showDeleteButton({ blog, user })}
      </div>
    </div>
  )
}

export default Blog
