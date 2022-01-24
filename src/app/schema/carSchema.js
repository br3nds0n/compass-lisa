const mongoose = require('mongoose')
const { Schema } = mongoose

const schema = new Schema({})

const Car = mongoose.model('Car', schema)

module.exports = Car
