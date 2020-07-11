const express = require('express')
const router = express.Router()
const passport = require('passport')
const bcrypt = require('bcrypt')
const { checkNotAuth } = require('../controllers/isAuth')

const initializePassport = require('../passport-config');
/**
 * @param passport
 * @param function arrow email
 * @param function arrow id
 */
initializePassport(
  passport, 
  email => users.find(user => user.email === email),
  id => users.find(user => user.id === id)
)

const users = []

// GET
// Register
router.get('/register', checkNotAuth, (req, res) => {
  res.render('auth/register', { title: 'Register' })
})

// Login
router.get('/login', checkNotAuth, (req, res) => {
  res.render('auth/login', { title: 'Login' })
})

// POST
// Register
router.post('/register', checkNotAuth, async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    users.push({
      id: Date.now().toString(),
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword
    })
    res.redirect('/login')
  } catch (error) {
    res.redirect('/register')
  }
})

// Login
router.post('/login', checkNotAuth, passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
}))

// Logout
router.delete('/logout', (req, res) => {
  req.logOut()
  res.redirect('/')
})

module.exports = router