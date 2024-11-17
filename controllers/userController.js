const { JsonWebTokenError } = require('jsonwebtoken')
const userService = require('../services/userService')
const jwt = require('jsonwebtoken')

const createToken=(_id)=>{
 return jwt.sign({_id:_id},process.env.SECRET, {expiresIn:'3d'})

}
const loginUser = async(req,res) => {
    const {email, password} = req.body
    try {
        const user = await userService.login(email, password)
        const token = createToken(user._id)
        res.status(200).json({email,token})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const signupUser = async(req,res) => {
    const {email, password} = req.body 
   
    try {
        const user = await userService.signup(email, password)
        const token = createToken(user._id)
        res.status(200).json({email,token})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = {signupUser,loginUser}

