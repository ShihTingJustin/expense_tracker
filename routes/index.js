const express = require('express')
const router = express.Router()

const home = require('./modules/home')
const records = require('./modules/records')
const sorts = require('./modules/sorts')

router.use('/', home)
router.use('/records', records)
// router.use('/sorts', sorts)

module.exports = router