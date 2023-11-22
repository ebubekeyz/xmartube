const express = require('express')
const router = express.Router()
const {authenticateUser, authenticatePermissions} = require('../middleware/authentication')

const {
    createArticle,
    getAllArticle,
    getSingleArticle,
    getSingleUserArticle,
    updateArticle,
    deleteArticle
} = require('../controllers/articleController')


router.route('/singleUserArticle').get(authenticateUser, getSingleUserArticle)
router
.route('/')
.post(authenticateUser, createArticle).get(getAllArticle)
router.route('/:id')
.get(getSingleArticle)
.patch([authenticateUser, authenticatePermissions('admin', 'owner')],updateArticle)
.delete([authenticateUser, authenticatePermissions('admin', 'owner')], deleteArticle)

module.exports = router

