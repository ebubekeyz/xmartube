const { BadRequestError, UnauthenticatedError } = require('../errors')
const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const {attachCookiesToResponse, createTokenUser} = require('../utils')


const register = async (req, res) => {
    const {name, email, image, password} = req.body
    const emailAlreadyExist = await User.findOne({email})
    if(emailAlreadyExist){
        throw new BadRequestError('Email already exist')
    }

    const isFirstAccount = (await User.countDocuments({})) 
    === 0
    const isSecondAccount = (await User.countDocuments({})) === 1

    let role = 'user';

    if(isFirstAccount){
        role = 'admin'
    }
    
    if(isSecondAccount){
        role = 'owner'
    }

    const user = await User.create({name, email, image, password, role})

    const tokenUser = createTokenUser(user)

    attachCookiesToResponse({res, user: tokenUser})

    
    res.status(StatusCodes.CREATED).json({user: tokenUser})
}



const login = async (req, res) => {
    const {email, password} = req.body

    if(!email || !password){
        throw new BadRequestError('Email or Passowrd should not be empty')
    }

    const user = await User.findOne({email})
    if(!user){
        throw new UnauthenticatedError('Invalid Credentials')
    }

    const isPasswordCorrect = await user.comparePassword(password)
    if(!isPasswordCorrect){
        throw new UnauthenticatedError('Password does not match')
    }

    const tokenUser = createTokenUser(user)

    attachCookiesToResponse({res, user: tokenUser})

    res.status(StatusCodes.OK).json({user: tokenUser})
}

const logout = async (req, res) => {
    res.cookie('token', 'logout', {
        httpOnly: true,
        expires: new Date(Date.now())
    })
    res.status(StatusCodes.OK).json({msg: 'user logged out'})
}

module.exports = {
    register,
    login,
    logout
}