/** @format */
const User = require('./models/User')
const Role = require('./models/Role')
const bcrypt = require('bcryptjs')
const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const { secret } = require('./config')
//
//
//
const generateAccessToken = (id, roles) => {
  const payload = {
    id,
    roles,
  }
  return jwt.sign(payload, secret, { expiresIn: '24h' })
}

//
//
//
class authController {
  async registration(req, res) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: 'Registration error' })
      }
      const { userName, password } = req.body
      const candidate = await User.findOne({ userName })
      if (candidate) {
        return res.status(400).json({ message: 'This name already exists' })
      }
      const hashPassword = bcrypt.hashSync(password, 3)
      const userRole = await Role.findOne({ value: 'USER' })
      const user = new User({
        userName,
        password: hashPassword,
        role: [userRole.value],
      })
      await user.save()
      return res
        .status(200)
        .json('Congratulations, you have successfully registered!')
    } catch (e) {
      console.log(e)
      res.status(400).json({ message: 'Registration error' })
    }
  }
  async login(req, res) {
    try {
      const { userName, password } = req.body
      const user = await User.findOne({ userName })
      if (!user) {
        return res.status(400).json('User is not found')
      }
      const validationPassword = bcrypt.compareSync(password, user.password)
      if (!validationPassword) {
        return res.status(400).json('User is not found')
      }
      const token = generateAccessToken(user._id, user.roles)
      return res.json({ token })
    } catch (e) {}
  }
  async getUsers(req, res) {
    try {
      const users = await User.find()
      res.json(users)
    } catch (e) {}
  }
}
module.exports = new authController()
