const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const FacebookStrategy = require('passport-facebook')
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

  passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_ID,
    clientSecret: process.env.FACEBOOK_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK,
    profileFields: ['email', 'displayName']
  }, (accessToken, refreshToken, profile, done) => {
    const { name, email } = profile._json

    User.findOne({ email })
      .then(user => {
        if (user) return done(null, user)
        const randomPassword = Math.random().toString(36).slice(-8)
        // 36 = A-Z a-z 0-9   -8 = 只取後八位
        bcrypt
          .genSalt(10)
          .then(salt => bcrypt.hash(randomPassword, salt))
          .then(hash => User.create({
            name,
            email,
            password: hash
          }))
          .then(user => done(null, user))
          .catch(err => done(err, false))
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

