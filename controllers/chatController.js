const {StatusCodes} = require('http-status-codes')
const CustomError = require('../errors')
const Chat = require('../models/Chat')
const Article = require('../models/Articles')


const createChat = async(req, res) => {
    const {article: articleId} = req.body
    const isValidArticle = await Article.findOne({_id: articleId})

    if(!isValidArticle){
        throw new CustomError.NotFoundError(`No article with id ${articleId}`)
    }
    req.body.subscribe = req.subscribe.subscribeId;
    const chat = await Chat.create(req.body)
    res.status(StatusCodes.CREATED).json({chat})
}

const getAllChat = async(req, res) => {
    const chat = await Chat.find({}).populate({
        path: 'subscribe',
        select: 'email'
    }).populate({
        path: 'article',
        select: 'title image category tag'
    })
    res.status(StatusCodes.OK).json({chat})
}

const getSingleArticleChat2 = async (req, res) => {
    const {id: articleId} = req.params
    const chat = await Chat.findOne({article: articleId}).sort('-createdAt').populate({
        path: 'subscribe',
        select: 'email'
    })
    res.status(StatusCodes.OK).json({chat, count: chat.length})
}


const getSingleArticleChat = async (req, res) => {
    const {id: articleId} = req.params
    const chat = await Chat.find({article: articleId}).sort('-createdAt').populate({
        path: 'subscribe',
        select: 'email'
    })
    res.status(StatusCodes.OK).json({chat, count: chat.length})
}

module.exports = {
    createChat, 
    getAllChat,
    getSingleArticleChat,
    getSingleArticleChat2
}