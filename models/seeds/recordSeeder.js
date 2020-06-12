if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const Record = require('../record')
const Category = require('../category')
const User = require('../user')
const db = require('../../config/mongoose')

const SEED_USER = [
  {
    name: 'Iron Man',
    email: 'tony@stark.com',
    password: 'iamironman'
  },
  {
    name: 'Captain America',
    email: 'captain@hotmail.com',
    password: 'icandothisallday'
  }
]

db.once('open', () => {
  console.log('mongodb connected!')
  console.log('Creating user ...')

  const createUser = (SEED_USER) => {
    return new Promise((resolve, reject) => {
      bcrypt
        .genSalt(10)
        .then(salt => bcrypt.hash(SEED_USER.password, salt))
        .then(hash => User.create({
          name: SEED_USER.name,
          email: SEED_USER.email,
          password: hash
        }))
        .then(user => {
          return resolve(userId = user._id)
        })
    })
  }

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
        icon: 'fas fa-grin-beam'
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

  const createRecord = (userId) => {
    return new Promise((resolve, reject) => {
      return resolve(Record.create(
        {
          category: 'house',
          name: '衛生紙',
          merchant: '全聯',
          date: '2020-3-6',
          amount: '180',
          userId
        },
        {
          category: 'transport',
          name: '機車保養',
          merchant: '巷口機車行',
          date: '2020-5-1',
          amount: '250',
          userId
        },
        {
          category: 'entertainment',
          name: '看電影',
          merchant: '美麗華大直影城',
          date: '2020-1-10',
          amount: '899',
          userId
        },
        {
          category: 'food',
          name: '聚餐',
          merchant: '老四川',
          date: '2020-2-7',
          amount: '2399',
          userId
        },
        {
          category: 'others',
          name: '還款',
          merchant: '',
          date: '2020-6-10',
          amount: '500',
          userId
        }
      ))
    })
  }

  async function runSeeder() {
    const userId0 = await createUser(SEED_USER[0])
    const userId1 = await createUser(SEED_USER[1])
    console.log('done!')
    console.log('creating category ...')

    await createCategory
    console.log('done!')
    console.log('Creating record ...')

    await createRecord(userId0)
    await createRecord(userId1)
    console.log('done!')
    console.log('Seeder Complete!')
    process.exit()
  }

  runSeeder()
})