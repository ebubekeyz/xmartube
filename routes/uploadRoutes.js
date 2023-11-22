const express = require('express')
const router = express.Router()
const {authenticateUser, authenticatePermissions} = require('../middleware/authentication')

const {
    uploadImageCloud,
    uploadVideoCloud,
    uploadVideoDesktop
} = require('../controllers/uploadController')


router.route('/').post(uploadVideoCloud)
router.route('/image').post(uploadImageCloud)
router.route('/video').post(uploadVideoDesktop)

module.exports = router

