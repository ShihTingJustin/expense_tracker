const mongoose = require('mongoose')
const Record = require('../record')
const db = require('../../config/mongoose')

db.once('open', () => {
  console.log('mongodb connected!')
  for (let i = 0; i < 5; i++) {
    Record.create({
      name: '早餐',
      category: pickCategory(),
      date: '2020-12-1',
      amount: Math.floor(Math.random() * 100)
    })
  }
  console.log('done!')
})


function pickCategory() {
  const category = ['house', 'transport', 'entertainment', 'food', 'others']
  return category[Math.floor(Math.random() * 5)]
}