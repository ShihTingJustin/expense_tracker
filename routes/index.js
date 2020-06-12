const express = require('express')
const router = express.Router()

const home = require('./modules/home')
const records = require('./modules/records')
const filter = require('./modules/filter')
const users = require('./modules/users')

router.use('/records', records)
router.use('/u', users)
router.use('/f', filter)
router.use('/', home)

module.exports = router