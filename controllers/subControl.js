const {StatusCodes} = require('http-status-codes')
const Subscribe = require('../models/Subscribe')
const CustomError = require('../errors')
const {attachCookiesToResponse, createTokenUser} = require('../utils2')



const createSubscription = async(req, res) => {
    const {email} = req.body
    const subscribe = await Subscribe.create({email})

    const tokenUser = createTokenUser(subscribe)

    attachCookiesToResponse({res, subscribe: tokenUser})
    res.status(StatusCodes.CREATED).json({subscribe})
}
const getAllSubscription = async(req, res) => {
    const subscribe = await Subscribe.find({})
    res.status(StatusCodes.CREATED).json({subscribe, count: subscribe.length})
}


const loginChat = async (req, res) => {
    const {email} = req.body

    if(!email){
        throw new BadRequestError('Email should not be empty')
    }

    const subscribe = await Subscribe.findOne({email})
    if(!subscribe){
        throw new UnauthenticatedError('Invalid Credentials')
    }



    const tokenUser = createTokenUser(subscribe)

    attachCookiesToResponse({res, subscribe: tokenUser})

    res.status(StatusCodes.OK).json({subscribe: tokenUser})
}

const logoutChat = async (req, res) => {
    res.cookie('token', 'logout', {
        httpOnly: true,
        expires: new Date(Date.now())
    })
    res.status(StatusCodes.OK).json({msg: 'user logged out'})
}


module.exports = {
    createSubscription,
    getAllSubscription,
    loginChat,
    logoutChat

}