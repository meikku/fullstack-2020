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
  }

