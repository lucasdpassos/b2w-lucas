require('dotenv').config()
const monk = require('monk')
const Joi = require('@hapi/joi')
const axios = require('axios')

// Lucas: Apesar de gostar muito de mongoose nas aplicações, neste caso específico eu preferi usar o monk junto com joi para validar os schemas
const db = monk(process.env.MONGO_URI)
const planets = db.get('planets')
const JefNode = require('json-easy-filter').JefNode;

const schema = Joi.object({
    name: Joi.string().required(),
    climate: Joi.string().required(),
    terrain: Joi.string().required()
})


 

module.exports = {
    ping: (req, res) => {
        res.json({pong:true})
    },
    getAll: async (req, res, next) => {
        try {
        const items = await planets.find({})
        res.json(items)
        } catch (error) {
            next(error)
        }
    },
    create: async (req, res, next) => {
        try {            
            const value = await schema.validateAsync(req.body)
            const inserted = await planets.insert(value)
            res.json(inserted)
        } catch (error) {
            next(error)
            
        }
    },
    getById: async (req, res, next) => {
        try {
            const { id } = req.params
            const item = await planets.findOne({_id: id})

            
            // Lucas: Abaixo é a função que vai buscar os links das aparições dos filmes de acordo com o nome do planeta pesquisado
            const planetFilms = []


            var needle = item.name

            axios.get('http://swapi.dev/api/planets/')
            .then(function (response) {    
                

                const planetData = response.data.results
                    
                
                var planetLoop = new JefNode(planetData).filter(function(node) {
                    if (node.value.name == needle) {
                        return node.value.films;
                    }
                }); 
                
               
                planetFilms.push(planetLoop)
               

                res.json({
                    item: item,
                    Films: planetFilms
                });
                console.log(planetFilms)
            
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
                   

            
            



        } catch (error) {
            next(error)
        }
    },
    getByName: async (req, res, next) => {
        try {
                     
            const item = await planets.find(req.query)
            res.json(item)

        } catch (error) {
            
        }
    },
    update: async (req, res, next) => {
        try {
            const { id } = req.params
            const value = await schema.validateAsync(req.body)
            var newvalues = { $set: value };
            const item = await planets.findOne({_id: id})
            
            if (!item) return next()

            await planets.update({
                _id: id
            }, newvalues)

            res.json(value)

        } catch (error) {
            next(error)
        }
    },
    delete: async (req, res, next) => {
        try {
            const { id } = req.params
            await planets.remove({_id: id})
            res.json({
                message: "success"
            })
        } catch (error) {
            next(error)
        }
    }
}