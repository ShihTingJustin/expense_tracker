const mongoose = require('mongoose')
const Schema = mongoose.Schema
const recordSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: false
  },
  date: {
    type: String,
    required: false
  },
  amount: {
    type: String,
    required: true
  },
  merchant: {
    type: String,
    required: false
  }
})

module.exports = mongoose.model('Record', recordSchema)