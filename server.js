const express = require('express')
const cors = require('cors')
const routes = require('./src/routes')


require('dotenv').config()

const app = express()

app.use(cors())
app.use(express.json())

app.use(routes)

app.listen(process.env.PORT || 3000, () => {
    console.log(`B2W Planets On-line on http://localhost:${process.env.PORT}`)
})

module.exports = app