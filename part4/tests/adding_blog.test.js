const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./listHelper')
const initialBlogs = require('./listHelper').initialBlogs
const blogsInDb = require('./listHelper').blogsInDb
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')


beforeEach(async () => {
  await Blog.deleteMany({})
  const blogObjects = helper.initialBlogs
    .map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})
    /* for (let blog of helper.initialBlogs) {
      let blogObject = new Blog(blog)
      await blogObject.save() */

test('a valid blog can be added', async () => {
    const newBlog = {
        title: 'The coding genius',
        author: 'Meikku',
        url: 'https://meikku.com',
        likes: 1
    }

    await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1)

    const titles = blogsAtEnd.map(n => n.title)
    expect(titles).toContain(
      'The coding genius'
      )
  })

  test('blog without title and url is not added', async () => {
    const newBlog = {
      author: 'Hans Välimäki',
      likes: 1000
    }

    await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

    const blogsAtEnd = await helper.blogsInDb()

      expect(blogsAtEnd.length).toBe(helper.initialBlogs.length)
   /*  const response = await api.get('api/blogs')

    expect(response.body).toHaveLength(initialBlogs.length) */
  })
     
    /* const response = await api.get('/api/blogs')
    const contents = response.body.map(r => r.content)

    expect(response.body).toHaveLength(initialBlogs.length + 1)
    expect(contents).toContain(
        'The coding genius' */
  
afterAll(() => {
    mongoose.connection.close()
  }) 