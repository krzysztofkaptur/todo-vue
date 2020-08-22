const express = require('express')
const router = express.Router()
const { ObjectId } = require('mongoose').Types

const Todo = require('../../models/Todo')

// create todo
router.post('/create', async (req, res) => {
  const { title, completed } = req.body

  try {
    const newTodo = await Todo.create({ title, completed })

    res.status(200).send(newTodo)
  } catch(err) {
    console.log(err)
  }
})

// delete todo
router.delete('/delete', async (req, res) => {
  const { id } = req.body

  try {
    await Todo.deleteOne({ _id: id })

    res.status(200).send('todo deleted')
  } catch(err) {
    console.log(err)
  }
})

// fetch todos
router.get('/', async (req, res) => {
  try {
    const todos = await Todo.find()

    res.status(200).json(todos)
  } catch(err) {
    console.log(err)
  }
})

// edit todo
router.put('/edit', async (req, res) => {
  const { id, title, completed } = req.body
  
  try {
    const todo = await Todo.findOneAndUpdate({ _id: id }, { title, completed })

    res.status(200).json(todo)
  } catch(err) {
    console.log(err)
  }
})

// edit todos
router.put('/editmany', async (req, res) => {
  const { ids, completed } = req.body

  try {
    await Todo.update(
      {
        _id: {
          $in: ids
        }
      },
      {
        $set: {
          completed
        }
      },
      {
        multi: true
      }
    )
  } catch(err) {
    console.log(err)
  }
})

// clear completed
router.delete('/deletemany', async (req, res) => {
  try {
    await Todo.deleteMany(
      {
        completed: true
      },
      {
        multi: true
      }
    )
  } catch(err) {
    console.log(err)
  }
})

module.exports = router