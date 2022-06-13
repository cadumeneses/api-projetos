const express = require('express')
const bodyParser = require('body-parser')

const projectRoute = require('./routes/projectRoute')

const app = express()
const port = 3000

app.use(bodyParser.urlencoded({ extended: false }))

projectRoute(app)

app.listen(port, () =>{
    console.log('Api iniciada')
})

app.get('/', (req, res) => res.send('Olá mundo'))