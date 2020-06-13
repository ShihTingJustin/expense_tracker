const express = require('express')
const router = express.Router()

const Record = require('../../models/record')

router.get('/', (req, res) => {
  const { category, month } = req.query
  const userId = req.user._id
  console.log(category, month, userId)

  if (category === 'all' && month === 'all') {
    return res.redirect('/')
  }

  const totalAmount = Record.aggregate([
    { $match: { userId, category } },
    {
      $group: {
        _id: null,
        total: { $sum: '$amount' }
      }
    }]).exec()

  const allRecord = Record.aggregate([
    { $match: { userId, category } },
    {
      $project: {
        name: 1,
        category: 1,
        date: 1,
        amount: 1,
        merchant: 1,
      }
    }
  ])

  async function filterCategory() {
    // iamironman
    const total = await totalAmount
    const records = await allRecord

    res.render('index', {
      records,
      totalAmount: total[0].total,
      f_category: category
    })
  }
  filterCategory()

})

// return Record.find({ userId, category })
//   .lean()
//   .sort()
//   .then(records => {
//     let totalAmount = 0
//     if (records.length > 0) {
//       records.forEach(record => totalAmount += Number(record.amount))
//       res.render('index', { records, totalAmount, f_category: category })
//     } else {
//       res.render('nothing', { totalAmount })
//     }

//   })
//   .catch(error => console.log(error))

module.exports = router