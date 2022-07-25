/** @format */
const dotenv = require('dotenv')
dotenv.config()

const express = require('express')
const mongoose = require('mongoose')
const PORT = process.env.PORT || 4040
const router = require('./authRouter')
//
//

const app = express()
//
//
app.use(express.json())
app.use('/api', router)
//
//
const start = async () => {
  try {
    await mongoose
      .connect(process.env.PASSWORD_DB)
      .then(() => console.log('Connect DB'))
      .catch(er => console.log(er))
    app.listen(PORT, () => {
      return console.log('Hello')
    })
  } catch (e) {
    console.log(e)
  }
}

start()
