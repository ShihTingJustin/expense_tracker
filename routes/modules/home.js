const express = require('express')
const router = express.Router()

const Record = require('../../models/record')
const Category = require('../../models/category')
const formatNum = require('../../formateNum')

router.get('/', (req, res) => {
  const userId = req.user._id

  const totalAmount = Record.aggregate([
    { $match: { userId } },
    {
      $group: {
        _id: null,
        amount: { $sum: '$amount' }
      }
    }
  ])

  const findAllCategories = new Promise((resolve, reject) => {
    Category.find()
      .lean()
      .then(categories => resolve(categories))
      .catch(err => console.error(err))
  })

  const findAllRecords = Record.aggregate([
    { $match: { userId } },
    {
      $project: {
        name: 1,
        category: 1,
        date: { $dateToString: { format: '%Y-%m-%d', date: '$date' } },
        amount: 1,
        merchant: 1,
      }
    }
  ])

  async function setHomeAsync() {
    const total = await totalAmount
    const categories = await findAllCategories
    const records = await findAllRecords

    if (total.length > 0) {
      const formateTotal = formatNum(total[0].amount)
      res.render('index', {
        records,
        totalAmount: formateTotal,
        categories
      })
    } else {
      res.render('nothing')
    }
  }

  setHomeAsync()
})

module.exports = router