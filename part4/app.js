const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
// const middleWare = require('.utils/middleWare')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

logger.info('connecting to', config.MONGODB_URI)


mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

// const listHelper = require('../utils/list_helper')

// test('dummy returns one', () => {
//   const blogs = []

//   const result = listHelper.dummy(blogs)
//   expect(result).toBe(1)
// })

app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogsRouter)


module.exports = app