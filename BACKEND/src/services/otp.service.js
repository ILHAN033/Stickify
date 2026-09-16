const Redis = require("ioredis")

const redis = new Redis({
    host:"localhost",
    port:"6379"
})


async function generateOTP(email){
    const otp = Math.floor(100000 + Math.random() * 150000).toString()
    await redis.set(`${email}`,otp,'EX','45')
    console.log(otp)
    return redis.get(`${email}`)
}

async function verifyOTP(email){
    const savedOtp = await redis.get(`${email}`)

    return savedOtp 
}


module.exports = {generateOTP,verifyOTP}