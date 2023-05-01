const express = require('express')
const cookieParser = require('cookie-parser')
const PORT = process.env.PORT || 3002
const cors = require('cors')
const db = require('./db')
const http = require('http')

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.listen(PORT, () => {
  console.log(`Express server listening on port: ${PORT}`)
})
