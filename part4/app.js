const express = require('express')
const app = express()
const cors = require('cors')
const config = require('./utils/config')
const mongoose = require('mongoose')
const blogsRouter = require('./controllers/blog')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')

const Blog = require('./models/blog')


const mongoUrl = config.mongoUrl

logger.info('connecting to', config.mongoUrl)
mongoose.connect(mongoUrl)
.then(() =>{ 
  logger.info('connected to MongoDB')
})
.catch((error) => {
  logger.error('error connecting to MongoDB', error.message)
})

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/blogs', blogsRouter)

module.exports = app

/* const PORT = 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
}) */