const express = require('express')
const router = express.Router()

const User = require('../../models/user')

router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', (req, res) => {

})

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body

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
        return User.create({
          name,
          email,
          password
        })
          .then(() => res.redirect('/'))
          .catch(err => console.log(`[Error]:${err}`))
      }
    })
})

module.exports = router