const nodemailer = require("nodemailer")


const transporter = nodemailer.createTransport({
    host:process.env.GMAIL_SMTP_URI,
    port:587,
    secure:false,
    auth:{
        user:process.env.GMAIL_SMTP_EMAIL,
        pass:process.env.GMAIL_APP_PASS
    }
})

module.exports = transporter