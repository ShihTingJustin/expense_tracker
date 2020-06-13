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
          return resolve(user)
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

  const createRecord = (user) => {
    return new Promise((resolve, reject) => {
      const userId = user._id
      const { name } = user
      if (name === 'Iron Man') {
        return resolve(Record.create(
          {
            category: 'house',
            name: 'mansion decoration',
            merchant: 'Stark Industries',
            date: '2020-3-6',
            amount: '2500000',
            userId
          },
          {
            category: 'transport',
            name: 'R8 maintenance',
            merchant: 'Audi',
            date: '2020-5-1',
            amount: '3960',
            userId
          },
          {
            category: 'entertainment',
            name: 'Avengers annual party',
            merchant: 'Stark Industries',
            date: '2020-1-10',
            amount: '2500000',
            userId
          },
          {
            category: 'food',
            name: 'cheese burger',
            merchant: 'Burger King',
            date: '2020-2-7',
            amount: '15',
            userId
          },
          {
            category: 'others',
            name: 'suit',
            merchant: 'Stark Industries',
            date: '2020-6-10',
            amount: '16000000',
            userId
          }
        ))
      } else {
        return resolve(Record.create(
          {
            category: 'house',
            name: 'rent',
            merchant: '',
            date: '2020-3-6',
            amount: '1000',
            userId
          },
          {
            category: 'transport',
            name: 'Street 750 maintenance',
            merchant: 'Harley-Davidson',
            date: '2020-5-1',
            amount: '790',
            userId
          },
          {
            category: 'entertainment',
            name: 'Avengers Annual Party',
            merchant: 'Stark Industries',
            date: '2020-1-10',
            amount: '10',
            userId
          },
          {
            category: 'food',
            name: 'steak',
            merchant: 'steak house',
            date: '2020-2-7',
            amount: '50',
            userId
          },
          {
            category: 'others',
            name: 'suit',
            merchant: 'Avengers',
            date: '2020-6-10',
            amount: '500',
            userId
          }
        ))
      }
    })
  }

  async function runSeeder() {
    const user0 = await createUser(SEED_USER[0])
    const user1 = await createUser(SEED_USER[1])
    console.log('done!')
    console.log('creating category ...')

    await createCategory
    console.log('done!')
    console.log('Creating record ...')

    await createRecord(user0)
    await createRecord(user1)
    console.log('done!')
    console.log('Seeder Complete!')
    process.exit()
  }

  runSeeder()
})