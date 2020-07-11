const LocalStartegy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

function initialize(passport, getUserByEmail, getUserById) {

  // How will we authenticate the user
  const authenticateUser = async (email, password, done) => {
    const user = getUserByEmail(email)

    if (user == null) return done(null, false, { message: 'No user with that email' })
  
    try {
      if (await bcrypt.compare(password, user.password)) {
        return done(null, user)
      } else {
       return done(null, false, { message: 'Password incorrect' })
      }
    } catch (error) {
      return done(error)
    }
  }

  // Standard Code
  passport.use(new LocalStartegy({ usernameField: 'email' }, authenticateUser))
  passport.serializeUser((user, done) => done(null, user.id))
  passport.deserializeUser((id, done) => done(null, getUserById(id)))
}

module.exports = initialize
