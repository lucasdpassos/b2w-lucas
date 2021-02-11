const express = require('express')
const router = express.Router
const PlanetController = require('./controllers/PlanetController')

// Lucas: Testing Ping
router.get('/ping', PlanetController.ping)

router.get

module.exports = router