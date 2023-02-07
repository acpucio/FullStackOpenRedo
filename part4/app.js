const usersRouter = require('./controllers/users')
const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const middleware = require('./utils/middleware')
const blogsRouter = require('./controllers/blog')
const logger = require('./utils/logger')

logger.info('connecting to', config.MONGODB_URI)

/*const mongoUrl = config.mongoUrl*/

/*logger.info('connecting to', config.mongoUrl)*/

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB', error.message)
  })

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)

module.exports = app

/* const PORT = 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
}) */