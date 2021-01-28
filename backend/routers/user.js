const express = require('express')
const User = require('../models/user')
const data = require('../data')
const expressAsyncHandler = require('express-async-handler')

const userRouter = express.Router()

userRouter.get('/seed',expressAsyncHandler (async(req,res)=>{
    //await User.remove({})
    const createdUsers = await User.insertMany(data.users)
    res.send({createdUsers})
}))

module.exports = userRouter