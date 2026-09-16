const userModel = require("../models/user.model")
const jwt = require('jsonwebtoken')
const bcrypt = require("bcryptjs")


async function registerUser(req,res){

    const {username,email,password} = req.body

    const userExists = await userModel.findOne({
        $or:[
            {username},
            {email}
        ]
    })


    if(userExists){
        return res.status(400).json({
            message:"User already exists"
        })
    }
    const hashedPass = await bcrypt.hash(password,10)

    const user = await userModel.create({
        username,
        email,
        password:hashedPass
    })

    const token = jwt.sign({id:user._id,email:user.email},process.env.JWT_SECRET, {
        expiresIn: '15m',
    })

    res.cookie('token', token, {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: false,
        maxAge: 15 * 60 * 1000,
    })

    res.status(201).json({
        message:"User has been created successfully",
        user
    })

}

async function loginUser(req,res){

    const {username,email,password} = req.body

    const user = await userModel.findOne({
        $or:[
            {username},
            {email}
        ]
    })


    if(!user){
        return res.status(400).json({
            message:"User doesn't exists"
        })
    }

    const hashPass = await bcrypt.compare(password,user.password,)


    if(!hashPass){
        return res.status(400).json({
            message:"Invalid password"
        })
    }

    const token = jwt.sign({id:user._id,email:user.email},process.env.JWT_SECRET, {
        expiresIn: '15m',
    })

    res.cookie('token', token, {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: false,
        maxAge: 15 * 60 * 1000,
    })

    res.status(201).json({
        message:"User has been LoggedIn successfully",
        user
    })

}

function logoutUser(req,res){
    res.clearCookie('token', { path: '/' })

    return res.status(200).json({
        message: "User has been logged out successfully"
    })
}

async function getCurrentUser(req,res){
    const token = req.cookies?.token

    if(!token){
        return res.status(401).json({
            message: "Unauthorized"
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await userModel.findById(decoded.id).select('-password')

        if(!user){
            return res.status(401).json({
                message: "Unauthorized"
            })
        }

        return res.status(200).json({
            user
        })
    } catch (error) {
        return res.status(401).json({
            message: "Token expired or invalid"
        })
    }
}

module.exports = {registerUser,loginUser,logoutUser,getCurrentUser}