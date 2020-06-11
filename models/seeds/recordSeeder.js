const mongoose = require('mongoose')
const Record = require('../record')
const Category = require('../../models/category')
const db = require('../../config/mongoose')

db.once('open', () => {
  console.log('mongodb connected!')
  console.log('creating category ...')

  const createCategory = new Promise((resolve, reject) => {
    return resolve(Category.create(
      {
        name: '家居物業',
        name_en: 'house',
        icon: 'fas fa-home'
      },
      {
        name: '交通出行',
        name_en: 'transport',
        icon: 'fas fa-car'
      },
      {
        name: '休閒娛樂',
        name_en: 'entertainment',
        icon: 'fas fa-grin-beam '
      },
      {
        name: '餐飲食品',
        name_en: 'food',
        icon: 'fas fa-utensils'
      },
      {
        name: '其他',
        name_en: 'others',
        icon: 'fas fa-ellipsis-h'
      }
    ))
  })

  const createRecord = new Promise((resolve, reject) => {
    return resolve(Record.create(
      {
        category: 'house',
        name: '衛生紙',
        merchant: '全聯',
        date: '2020-3-6',
        amount: '180'
      },
      {
        category: 'transport',
        name: '機車保養',
        merchant: '巷口機車行',
        date: '2020-5-1',
        amount: '250'
      },
      {
        category: 'entertainment',
        name: '看電影',
        merchant: '美麗華大直影城',
        date: '2020-1-10',
        amount: '899'
      },
      {
        category: 'food',
        name: '聚餐',
        merchant: '老四川',
        date: '2020-2-7',
        amount: '2399'
      },
      {
        category: 'others',
        name: '還款',
        merchant: '',
        date: '2020-6-10',
        amount: '500'
      }
    ))
  })

  async function runSeeder() {
    await createCategory
    console.log('done!')
    console.log('Creating record ...')

    await createRecord
    console.log('done!')
    console.log('Seeder Complete!')
    process.exit()
  }

  runSeeder()
})