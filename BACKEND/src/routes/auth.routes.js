const express = require('express')
const userController = require("../controllers/user.controller")

const router = express.Router()


router.post('/sign-up',userController.registerUser)
router.post('/sign-in',userController.loginUser)
router.get('/me',userController.getCurrentUser)
router.post('/sign-out',userController.logoutUser)


module.exports = router