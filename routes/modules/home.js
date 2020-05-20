const express = require('express')
const router = express.Router()

const Record = require('../../models/record')

router.get('/', (req, res) => {
  return Record.find()
    .lean()
    .then(records => {
      let totalAmount = 0
      records.forEach(record => {
        totalAmount += Number(record.amount)
      })
      console.log(totalAmount)
      res.render('index', { records, totalAmount })
    })
    .catch(error => console.error(error))
})

function setThousand(num) {
  
}

module.exports = router