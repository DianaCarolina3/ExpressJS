//endpoint para optener el token
const express = require('express')
const passport = require('passport')
const boom = require('boom')
const jwt = require('jsonwebtoken')
const api = express.Router()

const { config } = require('../../config')

//Basic Strategy
require('../../utils/auth/strategies/basic')

//funciona como un closure
api.post(
  '/token',
  passport.authenticate('basic', { session: false }),
  async (req, res, next) => {
    const user = req.user
    try {
      //si error en auth
      if (!user) {
        next(boom.unauthorized())
      }
      //no seccion al autentificar
      req.login(user, { session: false }, (error) => {
        if (error) {
          next(error)
        }

        const payload = { sub: user.username, email: user.email }
        const token = jwt.sign(payload, config.password.authJWTSecret, {
          expiresIn: '15m',
        })

        return res.status(200).json({ access_token: token })
      })
    } catch (error) {
      next(error)
    }
  }
)

module.exports = api
