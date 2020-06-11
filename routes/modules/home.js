const express = require('express')
const router = express.Router()

const Record = require('../../models/record')
const Category = require('../../models/category')

router.get('/', (req, res) => {

  const findAllRecords = new Promise((resolve, reject) => {
    Record.find()
      .lean()
      .then(records => resolve(records))
      .catch(err => console.error(err))
      // reject?
  })

  const findAllCategories = new Promise((resolve, reject) => {
    Category.find()
      .lean()
      .then(categories => resolve(categories))
      .catch(err => console.error(err))
  })

  async function setHomePage() {
    try {
      const records = await findAllRecords
      const categories = await findAllCategories
      console.log(categories)
      let totalAmount = 0
      records.forEach(record => {
        totalAmount += Number(record.amount)
      })
      res.render('index', { records, totalAmount, categories })
    } catch (e) {
      console.warn(e)
    }
  }

  setHomePage()
})

function setThousand(num) {

}

module.exports = router