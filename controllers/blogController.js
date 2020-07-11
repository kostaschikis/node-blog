const Blog = require('../models/blog')


const blog_index = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 })
    const user = req.user || null
    res.render('blogs/index', { title: 'All Blogs', blogs, user })
  } catch (error) {
    console.log(error);
  }
}

const blog_details = async (req, res) => {
  const id = req.params.id

  try {
    const result = await Blog.findById(id)
    res.render('blogs/details', { blog: result, title: 'Blog Details' })
  } catch (error) {
    res.status(404).render('404', { title: 'Blog not found' })
  } 
}

const blog_create_post = async (req, res) => {
  const blog = new Blog(req.body)

  try {
    await blog.save()
    res.redirect('/blogs')
  } catch (error) {
    console.log(error);
  }
}

const blog_delete = async (req, res) => {
  const id = req.params.id

  try {
    await Blog.findByIdAndDelete(id)
    res.json({ redirect: '/blogs' })
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  blog_index,
  blog_details,
  blog_create_post,
  blog_delete
}