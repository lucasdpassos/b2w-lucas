const express = require('express')
const router = express.Router()
const PlanetController = require('./controllers/PlanetController')

// Lucas: Testing Ping
router.get('/ping', PlanetController.ping)

// Lucas: Listar todos os planetas
router.get('/planets', PlanetController.getAll)

// Lucas: Planeta por Id
router.post('/cnpj', PlanetController.getByCNPJ)

// Lucas: Planeta pelo nome
router.get('/planets/:name', PlanetController.getByName)

// Lucas: Criar planeta
router.post('/register', PlanetController.create)

// Lucas: Update de planeta
router.put('/planets/:id', PlanetController.update)

// Lucas: Deletar planeta
router.delete('/planets/:id', PlanetController.delete)

module.exports = router