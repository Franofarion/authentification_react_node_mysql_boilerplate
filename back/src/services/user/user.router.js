const userRouter = require('express').Router();

const { login, register } = require('./user.controller');

userRouter.post('/login', login);
userRouter.post('/register', register);

module.exports = userRouter;
