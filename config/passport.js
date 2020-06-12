const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')

const User = require('../models/user')

module.exports = app => {
  // initialize passport
  app.use(passport.initialize())
  app.use(passport.session())

  passport.use(new LocalStrategy(
    { usernameField: 'email', passReqToCallback: true }, (req, email, password, done) => {
      User.findOne({ email })
        .then(user => {
          if (!user) {
            req.flash('error_msg', 'This email is not registered.')
            return done(null, false)
          }
          return bcrypt.compare(password, user.password).then(isMatch => {
            if (!isMatch) {
              req.flash('error_msg', 'Password incorrect.')
              return done(null, false)
            }
            return done(null, user)
          })
            .catch(err => console.log(`[Error]:${err}`))
        })
    }
  ))

  passport.serializeUser((user, done) => done(null, user.id))
  passport.deserializeUser((id, done) => {
    User.findById(id)
      .lean()
      .then(user => done(null, user))
      .catch(err => done(err, null)) // null means user is null
  })
}

