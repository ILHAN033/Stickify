const userModel = require("../models/user.model")
const {generateOTP,verifyOTP} = require("../services/otp.service")
const transporter =require("../services/mail.service")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")


async function forgotPassword(req,res){
    const {email} = req.body

    if(!email){
        return res.status(400).json({message:"Email is required"})
    }

    const user = await userModel.findOne({email})

    if(!user){
        return res.status(404).json({message:"User not found"})
    }

    const otp = await generateOTP(user.email)

    const resetToken = jwt.sign({id:user._id,email:user.email},process.env.JWT_SECRET, {
        expiresIn: '5m',
    })

    res.cookie('password_reset_token', resetToken, {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: false,
        maxAge: 5 * 60 * 1000,
    })

    const mail = await transporter.sendMail({
        from:process.env.SENDER_EMAIL,
        to:user.email,
        subject:"Reset Password",
        html:`<h1>Please check the OTP and verify</h1><h2>The OTP will expire in 45 secs</h2><h2>OTP: ${otp}</h2>`
        })


    res.status(200).json({message:"Otp has been sent..",mail})
}

async function resetPassword(req,res){
    const {otp,new_password} = req.body

    const token = req.cookies.password_reset_token || req.cookies.token
    if(!token){
        return res.status(401).json({message:"Unauthorized"})
    }

    let decoded
    try {
        decoded = jwt.verify(token,process.env.JWT_SECRET)
    } catch (error) {
        return res.status(401).json({message:"Invalid Token"})
    }

    const savedOpt = await verifyOTP(decoded.email)

    if(!savedOpt || savedOpt !== otp){
        return res.status(400).json({message:"OTP expired or not found"})
    }

    const newPass = await bcrypt.hash(new_password,10)

    const user = await userModel.findOneAndUpdate({email:decoded.email},{password:newPass},{new:true}).select('-password')

    res.status(201).json({message:"Password has been updated",user})

    

}


module.exports = {forgotPassword,resetPassword}