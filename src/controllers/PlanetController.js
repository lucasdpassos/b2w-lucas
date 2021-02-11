require('dotenv').config()
const monk = require('monk')
const Joi = require('@hapi/joi')
const axios = require('axios')
const db = monk(process.env.MONGO_URI)
const planets = db.get('planets')
const JefNode = require('json-easy-filter').JefNode;

const schema = Joi.object({
    name: Joi.string().required(),
    climate: Joi.string().required(),
    terrain: Joi.string().required()
})


axios.get('http://swapi.dev/api/planets/1')
  .then(function (response) {
    // handle success

    const planetData = response.data
    

    /* for(var planetName in planetData){
        console.log(planetName+": "+planetData[planetName]);
    } */
     
     var planetLoop = new JefNode(planetData).filter(function(node) {
        if (node.has('name')) {
            return node.value.population;
        }
    }); 
    
    console.log(planetLoop)
    
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .then(function () {
    // always executed
  });


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

            
                
            res.json(item)
            const films = this.planetData.name
            res.json(films)
            console.log(this.planetData.name)
            



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