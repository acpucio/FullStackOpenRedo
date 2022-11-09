const express = require('express')
const app = express()
const cors = require('cors')
const config = require('./utils/config')
const mongoose = require('mongoose')

const Blog = require('./models/blog')

const mongoUrl = config.mongoUrl
mongoose.connect(mongoUrl)

app.use(cors())
app.use(express.json())

module.exports = app

/* const PORT = 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
}) */