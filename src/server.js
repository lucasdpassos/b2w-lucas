const express = require('express')
const cors = require('cors')
const routes = require('./routes')
const bodyParser = require('body-parser')
require('dotenv').config()

const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({extended:false}))

app.use(routes)

app.listen(process.env.PORT, () => {
    console.log(`B2W Planets On-line on http://localhost:${process.env.PORT}`)
})