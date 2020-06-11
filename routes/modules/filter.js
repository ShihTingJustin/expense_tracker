const express = require('express')
const router = express.Router()

const Record = require('../../models/record')

router.get('/', (req, res) => {
  const { category } = req.query

  return Record.find({ category })
    .lean()
    .then(records => {
      let totalAmount = 0
      if (records.length > 0) {
        records.forEach(record => totalAmount += Number(record.amount))
        res.render('index', { records, totalAmount, f_category: category })
      } else {
        res.render('nothing', { totalAmount })
      }

    })
    .catch(error => console.log(error))
})

module.exports = router