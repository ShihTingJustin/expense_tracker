const express = require('express')
const router = express.Router()

const home = require('./modules/home')
const records = require('./modules/records')
const filter = require('./modules/filter')


router.use('/records', records)
router.use('/f', filter)
router.use('/', home)

module.exports = router