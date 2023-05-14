import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
const db = require('./db/index.js')
import http from 'http'
import mongoose from 'mongoose'
import 'dotenv/config.js'
const port = process.env.PORT || 3001
const routes = require('./src/routes/index.js')
const server = http.createServer(app)

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB')
    server.listen(port, () => {
      console.log(`Server running on port ${port}`)
    })
  })
  .catch((error) => {
    console.log('Error connecting to MongoDB', error.message)
    process.exit(1)
  })
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.use('/api/v1', routes)

app.listen(PORT, () => {
  console.log(`Express server listening on port: ${PORT}`)
})
