const Blog = require('../models/blog')
const User = require('../models/user')
const _ = require('lodash')

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON)
}

const initialBlogs = [
  {
    title: "parhaat kakkureseptit",
    author: "irma",
    url: "jotain",
    likes: 45,
    id: "5fba9b32033a67095c6690ee"
    },
    {
    title: "Kaikki koodaa",
    author: "Maria ja Vlada",
    url: "jotainmuuta",
    likes: 150,
    id: "5fbb78174c76960c3d47b5c1"
    },
    {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 3,
    id: "5fbcc774abaaa005ea0f65ff"
    },
    {
    title: "Peruna",
    author: "Edsger W. Dijkstra",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.html",
    likes: 89,
    id: "5fbcc7a9abaaa005ea0f6600"
    },
    {
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 33,
    id: "5fbcc7d7abaaa005ea0f6601"
    }
]

const dummy = () => {
    return (1)
  }

const totalLikes = (array) => {
  const reducer = (sum, item) => {
    return sum + item.likes
  }
  return array.length === 0
  ? 0
  : array.reduce(reducer, 0)
}
 
const favoriteBlog = (array) => {
  const favorite = array.map((array) => array.likes).indexOf(Math.max(...array.map(array=>array.likes)))
    return array.length === 0
    ? null
    : array[favorite]
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}
const getId = async () => {
  const blogs = await Blog.find({})
  return blogs[0].id.toJSON
}

const cat = () => {
  return 'cat'
}

const mostBlogs = (initialBlogs) => {
  const groupAuthors = _.groupBy(initialBlogs, blog => blog.author)
  console.log("groupAuthors", groupAuthors)
  const authors = []
  _.forEach(groupAuthors, (blogs, author) => {
    authors.push(
      {
        author: author,
        blogs: blogs.length
      }
    )
  })
  const sorted = _.sortBy(authors, author => author.blogs)
  return sorted.pop()
}

const mostLikes = (initialBlogs) => {
  const groupAuthors = _.groupBy(initialBlogs, blog => blog.author)
  const authors = []
  _.forEach(groupAuthors, (blogs, author) => {
    authors.push(
      {
        author: author,
        likes: countLikes(blogs)
      }
    )
  })
  const sorted = _.sortBy(authors, author => author.likes)
  return sorted.pop()
}

const countLikes = (arrays) => {
  const reducer = (sum, array) => {
    return sum + array.likes
   } 
   return arrays.reduce(reducer, 0)
}

  module.exports = {
    dummy, 
    totalLikes,
    favoriteBlog,
    initialBlogs,
    blogsInDb,
    getId,
    cat,
    usersInDb,
    mostBlogs,
    mostLikes

  }

