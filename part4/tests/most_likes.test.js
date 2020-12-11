const mostLikes = require('./listHelper').mostLikes
const initialBlogs = require('./listHelper').initialBlogs

  test('author with most likes', () => {
      const result = mostLikes(initialBlogs)

      expect(result).toEqual({
        author: 'Maria ja Vlada',
        likes: 150
      })
  })
