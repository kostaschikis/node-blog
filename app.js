if (process.env.NODE_ENV !== 'production') require('dotenv').config()

const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const blogRoutes = require('./routes/blogRoutes')
const authRoutes = require('./routes/authRoutes')
const { checkAuth } = require('./controllers/isAuth')
const methodOverride = require('method-override')

// express app
const app = express()

// connect to mongodb
const dbURI = 'mongodb+srv://devkostas:nafasskata3@nodeblog.7fwyc.mongodb.net/node-blog?retryWrites=true&w=majority'
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err))

// Register View Engine
app.set('view engine', 'ejs')
// app.set('views', 'myviews')

// middleware & static files
app.use(express.static('public'))
// Parses URL Encoded Data into an Object  
app.use(express.urlencoded({ extended: true }))
// flash
app.use(flash())
// express-session
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))
// passport middleware
app.use(passport.initialize())
app.use(passport.session())
// method override for logout delete request
app.use(methodOverride('_method'))
// middleware logger
app.use(morgan('dev'))

// Views
app.get('/', (req, res) => {
 res.redirect('/blogs')
})

app.get('/about', (req, res) => {
  // res.sendFile('./views/about.html', { root: __dirname } )
  res.render('about', { title: 'About' })
})

app.get('/blogs/create-blog', (req, res) => {
  res.render('blogs/create', { title: 'Create a new Blog' })
})

// Auth Routes
app.use('/', authRoutes)

// Blog Routes
app.use('/blogs', blogRoutes)

// Settings Page
app.get('/settings', checkAuth, (req, res) => {
  res.render('settings', req.user )
})

// 404 - Always at the bottom
app.use((req, res) => {
  res.status(404).render('404', { title: '404' })
})