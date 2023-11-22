const express = require('express')
const router = express.Router()
const {authenticateUser, authenticatePermissions} = require('../middleware/authentication')

const {
    createViews,
    getAllViews,
    getSingleArticleViews
} = require('../controllers/viewsController')


router.route('/').get(getAllViews).post(createViews)
router.route('/:id/article').get(getSingleArticleViews)

module.exports = router

