const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')
const error = require('../utils/logger').error

usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({}).populate('blogs', { title: 1, author: 1, url: 1 })
  response.json(users.map(u => u.toJSON()))
})

usersRouter.post('/', async (request, response, next) => {
  const body = request.body
  if (body.password.length < 3 || body.password === undefined) {
    return response.status(400).json({ error: 'password should be at least 3 characters long'})
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  })

  user.save()
  .then(savedUser => {
    response.json(savedUser)
  }) 
  .catch(error => next(error))

 /*  const savedUser = await user.save()

  response.json(savedUser) */
})

module.exports = usersRouter