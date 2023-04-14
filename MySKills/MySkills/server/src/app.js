const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const {sequelize} = require('./models')
const config = require ('./config/config')

const app = express()
app.use(morgan('combined'))
app.use(cors())
app.use(express.json())
app.use('/public', express.static('public'));

require('./route')(app)

sequelize.sync({force: false})
    .then(() => {
        app.listen(config.port)
        console.log(`Server started on Local Server port ${config.port}...`)
    })
