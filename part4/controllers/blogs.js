const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs.map(blog => blog.toJSON()))
})


 /*  Blog
    .find({})
    .then(blogs => {
      response.json(blogs.map(blog => blog.toJSON))
    })
})
 */
blogsRouter.post('/', (request, response) => {

  const body = request.body

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  })
  blog
    .save()
    .then(result => {
      response.status(200).json(result)
    })
})

module.exports = blogsRouter