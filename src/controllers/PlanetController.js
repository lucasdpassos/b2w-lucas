require('dotenv').config()
const monk = require('monk')
const Joi = require('@hapi/joi')

const db = monk(process.env.MONGO_URI)
const planets = db.get('planets')

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
    }
}