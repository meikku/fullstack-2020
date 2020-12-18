import React, {useState} from 'react'

const Blog = ({ blog }) => {
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

  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible}>
        <p>{blog.title} {blog.author}<button onClick ={() => setDetailsVisible(true)}>view</button></p>
        
      </div>
      <div style={showWhenVisible}>
      <p>{blog.title} {blog.author}<button onClick ={() => setDetailsVisible(false)}>hide</button></p>
      <p>{blog.url}</p>
      <p>{blog.likes}<button>like</button></p>
      <p>{blog.user.name}</p>
      </div>
    </div>
  )
}

export default Blog
