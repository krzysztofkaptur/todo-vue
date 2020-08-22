const { Schema, model } = require('mongoose')

const todoSchema = new Schema({
  title: {
    type: String,
    require: true
  },
  completed: {
    required: true,
    type: Boolean
  }
})

module.exports = model('todo', todoSchema)