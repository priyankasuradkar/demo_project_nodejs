const express = require('express')
const routes = express.Router();

const {
    signUp,
    login
} = require('../contoller/userController')

route.post('/signup', signUp)
route.post('/login', login)

module.exports = route