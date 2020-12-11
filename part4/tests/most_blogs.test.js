const mostBlogs = require('./listHelper').mostBlogs
const initialBlogs = require('./listHelper').initialBlogs

  test('author with most blogs', () => {
      const result = mostBlogs(initialBlogs)

      expect(result).toEqual({
        author: 'Edsger W. Dijkstra',
        blogs: 2
      })
  })
