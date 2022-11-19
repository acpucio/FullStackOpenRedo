const dummy = (blogs) => {
  blogs = [1]
  return blogs.length
}

const totalLikes = (blogs) => {
  return blogs[0].likes
}

module.exports = {
  dummy,
  totalLikes
}

