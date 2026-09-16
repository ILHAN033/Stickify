const express = require('express')
const passwordController = require("../controllers/password.controller")

const router = express.Router()


router.post('/forgot-password',passwordController.forgotPassword)
router.patch('/reset-password',passwordController.resetPassword)



module.exports = router