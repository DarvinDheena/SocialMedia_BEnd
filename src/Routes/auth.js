const express = require('express');
const authRouter = express.Router();
const { Login } = require('../Controllers/auth');

authRouter.post('/login' , Login )

module.exports = {
    authRouter
}