const express = require('express')
const router = express.Router()

const home = require('./modules/home')
const create = require('./modules/create')
const edit = require('./modules/edit')

router.use('/', home)
router.use('/create', create)
router.use('/edit', edit)

module.exports = router