import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import { Table } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { showNotification, hideNotification } from './reducers/notificationReducer'

const App = () => {
  const [ blogs, setBlogs ] = useState([])
  const [ username, setUsername ] = useState('')
  const [ password, setPassword ] = useState('')
  // const [ notification, setNotification ] = useState(null)
  const [ user, setUser ] = useState(null)
  const dispatch = useDispatch()

  console.log('user', user)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService
      .getAll()
      .then(initialBlogs =>
        setBlogs(initialBlogs)
      )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const notifyWith = (message) => {
    console.log('message:', message)
    dispatch(showNotification({ message }, 100))
    setTimeout(() => 
      dispatch(hideNotification(null)), 500
    )
  }

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        notifyWith(`a new blog  ${blogObject.title} by ${blogObject.author} was added`)
      })
  }

  const removeBlog = (id) => {
    const blogToDelete = blogs.find(n => n.id === id)
    blogService
      .remove(id)
      .then(() => {
        setBlogs(blogs.filter(p => p.id !== id))
        notifyWith(`Removed blog ${blogToDelete.title} `)
      })
  }

  const changeLikes = (id, blogObject) => {
    const likedBlog = blogs.find(n => n.id === id)
    blogService
      .update(id, blogObject)
      .then(returnedBlog => {
        returnedBlog.user = likedBlog.user
        setBlogs(blogs.map(blog => blog.id !== id ? blog : returnedBlog))
      })
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      notifyWith('Wrong credentials')
    }
  }
  const blogForm = () => (
    <Togglable buttonLabel ='create new' ref={blogFormRef}>
      <BlogForm createBlog={addBlog}
      />
    </Togglable>
  )

  const loginForm = () => (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
        username
          <input
            id='username'
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
        password
          <input
            id='password'
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id='login' type="submit">login</button>
      </form>
    </div>
  )

  const logOut =  async () => {
    window.localStorage.clear()
    blogService.setToken(null)
    setUser(null)
  }

  const sortedBlog = (blogs) => {
    return blogs.sort((a, b) => b.likes - a.likes)
  }

  return (
    <div className='container'>
      <Notification />
      {user === null ?
        loginForm() :
        <div>
          <p>{user.name} is logged in
            <button onClick={logOut}>
        logout
            </button></p>
          {blogForm()}
        </div>
      }
      <h2>Blogs</h2>
      {sortedBlog(blogs).map(blog =>
        <Blog key={blog.id} blog={blog} changeLikes={changeLikes} removeBlog={removeBlog} user={user}/>
      )}
    </div>
  )
}

export default App