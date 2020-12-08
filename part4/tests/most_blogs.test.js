const mostBlogs = require('./listHelper').mostBlogs
const initialBlogs = require('./listHelper').initialBlogs

  test('author with most blogs', () => {
      const result = mostBlogs(initialBlogs)

      expect(result).toBe({
        author: 'Edsger W. Dijkstra',
        blogs: 2
      })
  })
