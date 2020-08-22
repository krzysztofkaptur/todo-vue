const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

const db = process.env.DB
const schema = require('./controllers/schema')

const app = express()

mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })

app.use(express.json())
app.use(cors())
app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}))

app.listen(3000, () => console.log('server up'))