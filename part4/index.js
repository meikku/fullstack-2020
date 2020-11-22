const app = require('./app')
const http = require('http')

const config = require('./utils/config')
const logger = require('./utils/logger')
// const middleware = require('./utils/middleWare')

const server = http.createServer(app)

logger.info(`Server running on port ${config.PORT}`)

const PORT = process.env.PORT

server.listen(process.env.PORT, () => {
  logger.info(`Server running on port ${PORT}`)
})