const express = require('express')
const userRouter = express.Router()
const UserCtrl = require("../controllers/userController");
// const userRouter = Router();


userRouter.post('/signup', UserCtrl.signupUser)
userRouter.post('/login',UserCtrl.loginUser)



module.exports = userRouter

