import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import { useDispatch, useSelector } from 'react-redux'
import { showNotification, hideNotification } from './reducers/notificationReducer'
import { initializeUsers } from './reducers/userReducer'
import { BrowserRouter as Router, 
Switch, Route, Link, useParams, useRouteMatch } from 'react-router-dom'
import { 
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
 } from '@material-ui/core'



const App = () => {
  const [ blogs, setBlogs ] = useState([])
  const [ username, setUsername ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ user, setUser ] = useState(null)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeUsers())
  }, [dispatch])

  const users = useSelector(state => state.user)
  console.log('users', users)

  const padding = {
    padding: 5
  }

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

  const IndividualUser = ({ users }) => {
    const id = useParams().id
    const individualUser = users.find(n => n.id === id)
    if (!individualUser) {
      return null
    }
    return (
      <div> 
        <h2>{individualUser.username}</h2>
        <p><strong>added blogs</strong></p>
        {individualUser.blogs.map(blog => 
        <li key={blog.id}>{blog.title}</li>
        )}
      </div>
    )
  }

  return (
    <Container>
    <Router>
      <div>
        <Link style={padding} to="/blogs">blogs</Link>
        <Link style={padding} to="/users">users</Link>
        {user === null ?
          loginForm() :
            <span>{user.username} is logged in 
              <button onClick={logOut}>
              logout
              </button>
            </span>
          }
      </div>
      <Notification />
      <Switch>
        <Route path='/blogs'>
        <h2>Blogs</h2>
          {user !== null ? blogForm() : null}
          {sortedBlog(blogs).map(blog =>
          <Blog key={blog.id} blog={blog} changeLikes={changeLikes} removeBlog={removeBlog} user={user}/>
          )}
        </Route>
        <Route path='/users/:id'>
          <IndividualUser users={users} />
        </Route>
        <Route path='/users'>
          <h2>Users</h2>
          <TableContainer component={Paper}>
          <Table>
            <TableBody>
              <TableRow><TableCell></TableCell><TableCell><h4>blogs created</h4></TableCell></TableRow>
          {users.map(user =>
           <TableRow key={user.id}><TableCell><Link to={`/users/${user.id}`}>{user.username}</Link></TableCell><TableCell>{user.blogs.length}</TableCell>
           </TableRow>
          )}
          </TableBody>
          </Table>
          </TableContainer>
        </Route>
      </Switch>
    </Router>
    </Container>
  )
} 

export default App