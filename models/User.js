/** @format */

const { Schema, model } = require('mongoose')

const User = new Schema({
  userName: { type: String, require: true },
  password: { type: String, require: true },
  role: [{ type: String, ref: 'Role' }],
})

module.exports = model('User', User)
