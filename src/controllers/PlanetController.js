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
    },
    getById: async (req, res, next) => {
        try {
            const { id } = req.params
            const item = await planets.findOne({_id: id})
            res.json(item)

        } catch (error) {
            next(error)
        }
    },
    getByName: async (req, res, next) => {
        try {
            const { name } = req.params
            const itemName = await planets.find({name: name})

            res.jsom(itemName)

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