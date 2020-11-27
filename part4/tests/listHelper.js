const Blog = require('../models/blog')

const initialBlogs = [
  { _id: "5a422a851b54a676234d17f7", title: "React patterns", author: "Michael Chan", 
    url: "https://reactpatterns.com/", likes: 7, __v: 0 }, 
  { _id: "5a422aa71b54a676234d17f8", title: "Go To Statement Considered Harmful", author: "Edsger W. Dijkstra", 
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html", likes: 5, __v: 0 }
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

  module.exports = {
    dummy, 
    totalLikes,
    favoriteBlog,
    initialBlogs
  }

/* const mostBlogs = (array) => {
  const busiestAuthor = array.maxBy('author')
  console.log(busiestAuthor)
    return busiestAuthor
}
 */