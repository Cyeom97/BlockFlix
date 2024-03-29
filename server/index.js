import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import http from 'http'
import mongoose from 'mongoose'
import 'dotenv/config.js'
import routes from './src/routes/index.js'

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.use('/api/v1', routes)

const port = process.env.PORT || 3001
const server = http.createServer(app)

mongoose
  .connect(process.env.MONGODB_URI)
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
