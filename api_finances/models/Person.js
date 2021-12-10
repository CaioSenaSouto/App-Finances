const mongoose = require('mongoose')

const Person = mongoose.model('Person', {
  name: String,
  balance: Number,
  approved: Boolean
})

module.exports = Person
