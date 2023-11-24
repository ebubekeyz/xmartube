const express = require('express')
const router = express.Router()

const {authenticateUser} = require('../middleware/authentication2')


const {
    createSubscription,
    getAllSubscription,
    loginChat,
    logoutChat

} = require('../controllers/subControl')


router.route('/').get(getAllSubscription).post(createSubscription)
router.route('/login').post(loginChat)
router.route('/logout').get(logoutChat)

module.exports = router

