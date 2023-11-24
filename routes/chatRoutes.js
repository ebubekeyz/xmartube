const express = require('express')
const router = express.Router()

const {authenticateUser} = require('../middleware/authentication2')


const {
    createChat,
    getAllChat,
    getSingleArticleChat,
    getSingleArticleChat2,

} = require('../controllers/chatController')


router.route('/').get(getAllChat).post(authenticateUser, createChat)
router.route('/:id/article').get(getSingleArticleChat)
router.route('/:id')
.get(getSingleArticleChat2)

module.exports = router
