const mongoose = require('mongoose')
const Schema = mongoose.Schema
const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  name_en: {
    type: String,
    required: true,
    unique: true
  },
  icon: {
    type: String,
    required: false,
    unique: true
  }
})

module.exports = mongoose.model('Category', categorySchema)