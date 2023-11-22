const {StatusCodes} = require('http-status-codes')
const Article = require('../models/Articles')
const CustomError = require('../errors')
const Views = require('../models/Views')



const createViews = async(req, res) => {
    const {article: articleId} = req.body
    const isValidArticle = await Article.findOne({_id: articleId})

    if(!isValidArticle){
        throw new CustomError.NotFoundError(`No article with id ${articleId}`)
    }
    const views = await Views.create(req.body)
    res.status(StatusCodes.CREATED).json({views})
}
const getAllViews = async(req, res) => {
    const views = await Views.find({}).populate({
        path: 'article',
        select: 'title image category tag'
    })
    res.status(StatusCodes.CREATED).json({views, count: views.length})
}


const getSingleArticleViews = async (req, res) => {
    const {id: articleId} = req.params
    const views = await Views.find({article: articleId}).populate({
        path: 'article',
        select: 'title image category tag'
    })
    res.status(StatusCodes.OK).json({views, count: views.length})
}

module.exports = {
    createViews,
    getAllViews,
    getSingleArticleViews
}