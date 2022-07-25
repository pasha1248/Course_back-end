/** @format */

const Router = require('express')
const router = new Router()
const controller = require('./authContriller')
const { check } = require('express-validator')
const authMiddleware = require('./middleware/authMiddleware')
const roleMiddleware = require('./middleware/roleMiddleware')
//
//
//
router.post(
  '/registration',
  [check('userName', 'Name cannot be empty').notEmpty()],
  [
    check('password', 'Password must by between 4 and 7 characters ').isLength({
      min: 4,
      max: 14,
    }),
  ],

  controller.registration
)
router.post('/login', controller.login)
router.get(
  '/users',
  authMiddleware,
  roleMiddleware(['ADMIN']),
  controller.getUsers
)

module.exports = router
