const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

require('dotenv').config()

const todosRouter = require('./routes/todosRouter/routes')

const app = express()

// database connection
const dbURI = process.env.DB;
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true, useFindAndModify: false })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

app.use(cors())
app.use(express.json())
app.use('/todos', todosRouter)

const port = process.env.PORT || 5000

app.listen(port, () => console.log('working on port 5000'))