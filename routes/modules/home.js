const express = require('express')
const router = express.Router()

const Record = require('../../models/record')

router.get('/', (req, res) => {
  return Record.find()
    .lean()
    .then(records => {
      let totalAmount = 0
      records.forEach(record => totalAmount += Number(record.amount))
      res.render('index', { records, totalAmount })
    })
    .catch(error => console.error(error))
})

router.get('/filter/:category', (req, res) => {
  const { category } = req.params
  return Record.find({ category: category })
    .lean()
    .then(records => {
      let totalAmount = 0
      records.forEach(record => totalAmount += Number(record.amount))
      res.render('index', { records, totalAmount })
    })
    .catch(error => console.log(error))
})

module.exports = router