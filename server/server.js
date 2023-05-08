import express from 'express'
const cookieParser = require('cookie-parser')
const PORT = process.env.PORT || 3002
const cors = require('cors')
const db = require('./src/db/db.js')
const http = require('http')
import routes from './src/routes/index.js'

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.use('/api/v1', routes)

app.listen(PORT, () => {
  console.log(`Express server listening on port: ${PORT}`)
})
