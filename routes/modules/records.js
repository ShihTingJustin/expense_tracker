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

router.put('/:id', (req, res) => {
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
router.delete('/:id', (req, res) => {
  const { id } = req.params
  return Record.findById(id)
    .then(record => record.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// filter
router.get('/filter/', (req, res) => {
  const { category } = req.query
  return Record.find({ category })
    .lean()
    .then(records => {
      let totalAmount = 0
      records.forEach(record => totalAmount += Number(record.amount))
      res.render('index', { records, totalAmount })
    })
    .catch(error => console.log(error))
})

// sorts
router.get('/sort/', (req, res) => {
  const { name, way } = req.query
  console.log(req.query)
  return Record.find()
    .lean()
    .sort({ [name]: way })
    .then(records => {
      let totalAmount = 0
      records.forEach(record => totalAmount += Number(record.amount))
      res.render('index', { records, totalAmount })
    })
    .catch(error => console.log(error))
})


// router.get('/filter/', (req, res) => {
//   const { category } = req.query
//   return Record.find({ category })
//     .lean()
//     .then(records => {
//       let totalAmount = 0
//       records.forEach(record => totalAmount += Number(record.amount))
//       res.render(`${category}`, { records, totalAmount })
//     })
//     .catch(error => console.log(error))
// })

// router.get('/filter?category=house_sorts', (req, res) => {
//   //const { name, way } = req.query
//   console.log(123, req.query)
//   return Record.find()
//     .lean()
//     .sort({ [name]: way })
//     .then(records => res.render('house', { records }))
//     .catch(error => console.log(error))
// })



module.exports = router