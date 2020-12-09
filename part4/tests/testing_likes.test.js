const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./listHelper')
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

test('likes are always set to 0 if empty', async () => {
    const newBlog = {
        author: "Gordon Ramsay",
        title: "Gourmet",
        url: "http://gordonrocks.com",
        likes: null
    }
    
    await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd[helper.initialBlogs.length].likes).toBe(0)
})
  
afterAll(() => {
    mongoose.connection.close()
  }) 