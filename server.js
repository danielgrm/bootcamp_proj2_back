const express = require('express')
var bodyparser = require('body-parser')
const app = express()
const PORT = 3002
const cors = require('cors')
const connectDB = require('./config/db')

// init middleware
app.use(express.json())
app.use(bodyparser.urlencoded({extended:true}))
app.use(bodyparser.json())
app.use(cors())
connectDB()

app.use('/', require('./routes/barra'))
app.use('/user', require('./routes/user'))
app.use('/auth', require ('./routes/auth'))
app.use('/profile', require ('./routes/profile'))
// app.use('/user/cast', require ('./routes/cast'))

app.listen(PORT, () => { console.log(`to rodando na ${PORT}`) })
