const express = require('express')
const cookieParser = require("cookie-parser")
const cors = require("cors")
const authRoutes = require('./routes/auth.routes')
const passwordRoutes = require('./routes/password.routes')

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}))


app.use('/api/user',authRoutes)
app.use('/api/user/password',passwordRoutes)


module.exports = app