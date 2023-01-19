const express = require('express')
import cookieParser from 'cookie-parser'
import cors from 'cors'
import http from 'http'
import mongoose from 'mongoose'
import 'dotenv/config'

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

const PORT = process.env.PORT || 3001
