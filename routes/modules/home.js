const express = require('express')
const router = express.Router()

const Record = require('../../models/record')
const Category = require('../../models/category')

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
    { $match: { userId }},
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

  async function setHomePage () {
   const total = await totalAmount
   const categories = await findAllCategories
   const records = await findAllRecords
    res.render('index', { 
      records, 
      totalAmount: total[0].amount, 
      categories })
  }
  setHomePage()

  // const findAllRecords = new Promise((resolve, reject) => {
  //   const userId = req.user._id
  //   Record.find({ userId })
  //     .lean()
  //     .then(records => resolve(records))
  //     .catch(err => console.error(err))
  //     // reject?
  // })

  // const findAllCategories = new Promise((resolve, reject) => {
  //   Category.find()
  //     .lean()
  //     .then(categories => resolve(categories))
  //     .catch(err => console.error(err))
  // })

  // async function setHomePage() {
  //   try {
  //     const records = await findAllRecords
  //     const categories = await findAllCategories

  //     // total amount
  //     let totalAmount = 0
  //     records.forEach(record => {
  //       totalAmount += Number(record.amount)
  //     })

  //     res.render('index', { records, totalAmount, categories })
  //   } catch (e) {
  //     console.warn(e)
  //   }
  // }

  // setHomePage()
})

function setThousand(num) {

}

module.exports = router