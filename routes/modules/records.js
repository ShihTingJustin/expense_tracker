const express = require('express')
const router = express.Router()

const Record = require('../../models/record')

// CREATE
router.get('/create', (req, res) => {
  res.render('create')
})

router.post('/', (req, res) => {
  const { name, category, date, amount } = req.body

  console.log(req.body)
  return Record.create({ name, category, date, amount })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// UPDATE
router.get('/edit/:id', (req, res) => {
  const { id } = req.params
  return Record.findById(id)
    .lean()
    .then(record => res.render('edit', { record }))
})

router.post('/:id', (req, res) => {
  const { id } = req.params
  return Record.findById(id)
    .then(record => {
      record = Object.assign(record, req.body)
      return record.save()
    })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// DELETE
router.get('/delete/:id', (req, res) => {
  const { id } = req.params
  return Record.findById(id)
    .then(record => record.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})





module.exports = router