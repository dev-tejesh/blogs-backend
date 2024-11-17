const User = require('../models/usermodel')
const bcrypt = require('bcrypt')
const validator = require('validator')
const jwt = require('jsonwebtoken')



const signup = async(email, password) => {
    if(!email || !password){
        throw Error("All Fields must be filled")
    }
    if(!validator.isEmail(email)){
        throw Error("Email is not valid")
    }
    const exists = await User.findOne({ email: email })
    if(exists){
        throw new Error("Email already in use")
    }
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password,salt)
    const user = await User.create({email, password:hash})
    return user
}

const login = async(email, password) => {
    if(!email || !password){
        throw Error("All Fields must be filled")
    }
    const user = await User.findOne({email})
    if(!user){
        throw Error("incorrect email")
    }

    const match = await bcrypt.compare(password, user.password)

    if(!match){
        throw Error('Incorrect Password')
    }

    return user
}   

module.exports = {signup,login}