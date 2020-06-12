const express = require('express')
const passport = require('passport')
const bcrypt = require('bcryptjs')
const router = express.Router()

const User = require('../../models/user')

router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/u/login'
}
  // function (req, res) {
  //   const { email, password } = req.body
  //   res.render('login', { email, password })
  // }
))

router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', 'You are now logged out.')
  res.redirect('/u/login')
})

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  const errors = []

  if (!email && !password && !confirmPassword) {
    errors.push({ message: '請您填寫 Email、密碼及密碼確認欄位' })
  } else if (!email) {
    errors.push({ message: '請填寫您的 Email。' })
  } else if (!password) {
    errors.push({ message: '請填寫您的密碼。' })
  } else if (!confirmPassword) {
    errors.push({ message: '請填寫確認密碼。' })
  }

  if ((password.length && confirmPassword.length) && (password !== confirmPassword)) {
    errors.push({ message: '密碼與確認密碼不相符！' })
  }

  if (errors.length) {
    return res.render('register', {
      errors,
      name,
      email,
      password,
      confirmPassword
    })
  }

  // check if email is registered
  User.findOne({ email })
    .then(user => {
      if (user) {
        console.log('this email is registered!')
        res.render('register', {
          name,
          email,
          password,
          confirmPassword
        })
      } else {
        // create data and redirect
        return bcrypt
          .genSalt(10)
          .then(salt => bcrypt.hash(password, salt))
          .then(hash => User.create({
            name,
            email,
            password: hash
          })
          )
          .then(() => res.redirect('/'))
          .catch(err => console.log(`[Error]:${err}`))
      }
    })
})

module.exports = router