const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./listHelper')
const initialBlogs = require('./listHelper').initialBlogs
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

beforeEach(async () => {
    await Blog.deleteMany({})
  
    for (let blog of helper.initialBlogs) {
      let blogObject = new Blog(blog)
      await blogObject.save()
    }
  })

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

    const response = await api.get('/api/blogs')

    const contents = response.body.map(r => r.content)

    expect(response.body).toHaveLength(initialBlogs.length + 1)
    expect(contents).toContain(
        'The coding genius'
    )
})

afterAll(() => {
    mongoose.connection.close()
  }) 