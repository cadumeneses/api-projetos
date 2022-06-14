const express = require('express')
const bodyParser = require('body-parser')

const projectRoute = require('./routes/projectRoute')
const taskRoute = require('./routes/taskRoute')
const teamRoute = require('./routes/teamRoute')

const app = express()
const port = 3000

app.use(bodyParser.urlencoded({ extended: false }))

projectRoute(app)
taskRoute(app)
teamRoute(app)

app.listen(port, () =>{
    console.log('Api iniciada')
})

app.get('/', (req, res) => res.send('API de gerenciamento de projetos'))