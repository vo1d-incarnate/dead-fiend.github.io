require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const router = require('./routers/index')
const errorHandler = require('./middleware/errorHandlingMiddleware')
const path = require('path')

const PORT = process.env.PORT || 5000

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname, 'static')))

app.use(fileUpload({}))
app.use('/api', router)

app.use(errorHandler)

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
})
const start = async() => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, ()=> console.log(`SERVER STARTED ON PORT ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start();

