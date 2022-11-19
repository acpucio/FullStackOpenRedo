const Blog = require('../models/blog')

const initialBlog = [
  {
    title: 'Living is easy',
    author: 'Albert Pucio',
    url: 'www.albertpucio.com',
    likes: 20
  },
  {
    title: 'Living is Hard',
    author: 'Pally McGowan',
    url: 'www.bingbong.com',
    likes: 50
  }
]

const nonExistingId = async () => {
  const blog = new Blog({
    title: 'willremovethissoon',
    author: 'Dilly McDally'
  })

  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlog, nonExistingId, blogsInDb
}