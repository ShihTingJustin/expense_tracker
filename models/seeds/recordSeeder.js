const mongoose = require('mongoose')
const Record = require('../record')
const db = require('../../config/mongoose')

let pickedCategory = ''

db.once('open', () => {
  console.log('mongodb connected!')
  for (let i = 0; i < 10; i++) {
    Record.create({
      category: pickCategory(),
      name: pickName(),
      date: pickDate(),
      amount: Math.floor(Math.random() * 500 + 50)
    })
  }
  console.log('done!')
})

function pickDate() {
  let randomDate = Math.floor(Math.random() * 30 + 1)
  let randomMonth = Math.floor(Math.random() * 12 + 1)
  return `2020-${randomMonth}-${randomDate}`
}

function pickCategory() {
  const category = ['house', 'transport', 'entertainment', 'food', 'others']
  return pickedCategory = category[Math.floor(Math.random() * 5)]

}

function pickName() {
  switch (pickedCategory) {
    case 'house':
      return '日常用品'

    case 'transport':
      return '機車保養'

    case 'entertainment':
      return '看電影'

    case 'food':
      return '吃飯'

    case 'others':
      return '忘了買什麼'
  }
}