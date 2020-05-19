const express = require('express')
const router = express.Router()

const Record = require('../../models/record')

router.get('/create', (req, res) => {
  res.render('create')
})

router.post('/', (req, res) => {
  const { name, category, date, amount } = req.body
  return Record.create({ name, category, date, amount })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

router.get('/edit', (req, res) => {
  res.render('edit')
})







module.exports = router