const express = require('express')
const router = express.Router()

const Record = require('../../models/record')
const formatNum = require('../../formateNum')

router.get('/', (req, res) => {
  const { category, month } = req.query
  const userId = req.user._id

  // user doesn't choose
  if (category === 'all' && month === 'all') {
    return res.redirect('/')
  }
  // user choose category and month
  else if (category !== 'all' && month !== 'all') {
    const filterAmount = Record.aggregate([
      { $match: { userId, category } },
      {
        $group: {
          _id: { $month: '$date' },
          amount: { $sum: '$amount' }
        }
      },
      { $match: { _id: Number(month) } }
    ])

    const filterRecord = Record.aggregate([
      { $match: { userId, category } },
      {
        $project: {
          name: 1,
          category: 1,
          date: { $dateToString: { format: '%Y-%m-%d', date: '$date' } },
          month: { $month: '$date' },
          amount: 1,
          merchant: 1
        }
      },
      { $match: { month: Number(month) } }
    ])

    async function filterAsync() {
      const filter = await filterAmount
      const records = await filterRecord

      if (filter.length > 0) {
        const formateTotal = formatNum(filter[0].amount)
        res.render('index', {
          records,
          totalAmount: formateTotal,
          f_category: category,
          month
        })
      } else {
        res.render('index', {
          totalAmount: 0,
          f_category: category,
          month
        })
      }
    }
    filterAsync()
  }

  // user choose category only
  else if (category !== 'all') {
    const filterAmount = Record.aggregate([
      { $match: { userId, category } },
      {
        $group: {
          _id: null,
          amount: { $sum: '$amount' }
        }
      }])

    const filterRecord = Record.aggregate([
      { $match: { userId, category } },
      {
        $project: {
          name: 1,
          category: 1,
          date: { $dateToString: { format: '%Y-%m-%d', date: '$date' } },
          amount: 1,
          merchant: 1
        }
      }
    ])

    async function filterAsync() {
      const filter = await filterAmount
      const records = await filterRecord

      if (filter.length > 0) {
        const formateTotal = formatNum(filter[0].amount)
        res.render('index', {
          records,
          totalAmount: formateTotal,
          f_category: category,
          month
        })
      } else {
        res.render('index', {
          totalAmount: 0,
          f_category: category,
          month
        })
      }
    }
    filterAsync()
  }
  // user choose month only
  else if (month !== 'all') {
    const filterAmount = Record.aggregate([
      { $match: { userId } },
      {
        $group: {
          _id: { $month: '$date' },
          amount: { $sum: '$amount' }
        }
      },
      { $match: { _id: Number(month) } }
    ])

    const filterRecord = Record.aggregate([
      { $match: { userId } },
      {
        $project: {
          name: 1,
          category: 1,
          date: { $dateToString: { format: '%Y-%m-%d', date: '$date' } },
          month: { $month: '$date' },
          amount: 1,
          merchant: 1
        }
      },
      { $match: { month: Number(month) } }
    ])

    async function filterAsync() {
      const filter = await filterAmount
      const records = await filterRecord

      if (filter.length > 0) {
        const formateTotal = formatNum(filter[0].amount)
        res.render('index', {
          records,
          totalAmount: formateTotal,
          f_category: category,
          month
        })
      } else {
        res.render('index', {
          totalAmount: 0,
          f_category: category,
          month
        })
      }
    }
    filterAsync()
  }
})

module.exports = router