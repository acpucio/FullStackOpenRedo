const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlog)
})

test('blogs are returned as json', async () => {
  console.log('entered test')
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
}, 100000)

test('number of blogs entries are returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(helper.initialBlog.length)
})

test('a valid blog entry can be added', async () => {
  const newBlog = {
    title: 'Yeppers peppers',
    author: 'Tally McGowan Pucio',
    url: 'www.pingpong.com',
    likes: 5000
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlog.length + 1)

  const title = blogsAtEnd.map(n => n.title)
  expect(title).toContain(
    'Yeppers peppers'
  )

})

describe('deletion of a blog', () => {
  test('succeeds with a status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    console.log(blogToDelete.id)

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(
      helper.initialBlog.length - 1
    )

    const title = blogsAtEnd.map(r => r.title)

    expect(title).not.toContain(blogToDelete.title)
  })
})

describe('modification of a blog', () => {

  test('blogs are modified', async() => {
    console.log('entered modification test')

    const blogsAtStart = await helper.blogsInDb()

    const blogToModify = blogsAtStart[0]

    const modifiedBlogLikes = blogToModify.likes * 200

    await api
      .put(`/api/blogs/${blogToModify.id}`)
      .send({ likes: modifiedBlogLikes })
      .expect(200)

    const blogsAtEnd = await helper.blogsInDb()

    const likes = blogsAtEnd.map(n => n.likes)

    expect(likes).toContain(modifiedBlogLikes)

  })

})

describe('when there is initially one user in db', () => {
  beforeEach(async() => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('username must be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toEqual(usersAtStart)
  })
})


afterAll(() => {
  mongoose.connection.close()
})
