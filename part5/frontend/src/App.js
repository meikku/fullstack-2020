import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'

const App = () => {
  const [ blogs, setBlogs ] = useState([])
  const [ newBlog, setNewBlog ] = useState('')
  const [ username, setUsername ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ notification, setNotification ] = useState(null)
  const [ user, setUser ] = useState(null)
  const [ title, setTitle ] = useState("")
  const [ author, setAuthor ] = useState("")
  const [ url, setUrl ] = useState("")

  useEffect(() => {
    blogService.getAll().then(initialBlogs =>
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
    setNotification({ message })
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: title,
      author: author,
      url: url
  //  content: newBlog
    }

    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setNewBlog('')
      notifyWith(`a new blog  ${title} by ${author} was added`)
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
      //  setNotification('Wrong credentials')
      notifyWith('Wrong credentials')
     /*  setTimeout(() => {
        setNotification(null)
      }, 5000) */
    }
  }

  
  const loginForm = () => (
    <div>
    <h2>Log in to application</h2>
    <form onSubmit={handleLogin}>
      <div>
        username
            <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
            <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
    </div>
  )

  const blogForm = () => (
    <div>
    <h2>create new</h2> 
        
    <form onSubmit={addBlog}>
      <div>
        title: 
      <input
        type="text"
        value={title}
        onChange={({ target }) => setTitle(target.value)}
      />
      </div>
      <div>
        author:
      <input
        type="text"
        value={author}
        onChange={({ target }) => setAuthor(target.value)}
      />
      </div>
      <div>
        url:
      <input
        type="text"
        value={url}
        onChange={({ target }) => setUrl(target.value)}
      />
      </div>
      <button type="submit">create</button>
    </form>
  </div>
  )

  const logOut =  async (event) => {
    window.localStorage.clear()
    setUser(null)
  }

  return (
    <div>
      <Notification notification={notification} />
      {user === null ? 
      loginForm() : 
      <div>
        <h2>blogs</h2>
      <p>{user.name} is logged in 
      <button onClick={logOut}>
        logout
      </button></p>
      {blogForm()}
      </div>
    }
      
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App