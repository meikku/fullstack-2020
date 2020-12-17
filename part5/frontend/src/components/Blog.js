import React from 'react'

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
  <div>
    <p>{blog.title} {blog.author}</p> 
    <p>{blog.url}</p> 
    <p>{blog.likes}<button>like</button></p> 
    <p>{blog.user.name}</p>
  </div>
  </div>
  )}

export default Blog
