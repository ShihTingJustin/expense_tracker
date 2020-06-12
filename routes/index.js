const express = require('express')
const router = express.Router()
const { authenticator } = require('../middleware/auth')

const home = require('./modules/home')
const records = require('./modules/records')
const filter = require('./modules/filter')
const users = require('./modules/users')

router.use('/records', authenticator, records)
router.use('/u', users)
router.use('/f', authenticator, filter)
router.use('/', authenticator, home)

module.exports = router