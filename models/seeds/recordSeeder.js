const mongoose = require('mongoose')
const Record = require('../record')
const db = require('../../config/mongoose')

db.once('open', () => {
  console.log('mongodb connected!')
  for (let i = 0; i < 5; i++) {
    Record.create({
       name: '早餐',
       amount: Math.floor(Math.random() * 100)
  })
  }
  console.log('done!')
})

