const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./listHelper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')


/* 
beforeEach(async () => {
    await Blog.deleteMany({})

    helper.initialBlogs.forEach(async (blog) => {
        let blogObject = new Blog(blog)
        await blogObject.save()
    })
}) */

test('blogs are returned as json', async () => {
    await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

afterAll(() => {
    mongoose.connection.close()
})