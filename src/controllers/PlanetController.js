require('dotenv').config()
const monk = require('monk')
const Joi = require('@hapi/joi')
const axios = require('axios')
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
// Lucas: Apesar de gostar muito de mongoose nas aplicações, neste caso específico eu preferi usar o monk junto com joi para validar os schemas
const db = monk(process.env.MONGO_URI)
const planets = db.get('planets')
const JefNode = require('json-easy-filter').JefNode;



 

module.exports = {
    ping: (req, res) => {
        res.json({pong:true})
    },
    cep: (req, res) => {
                var newCnpj = req.body
                axios.get(`https://www.receitaws.com.br/v1/cnpj/${newCnpj}`)
                .then(dadoscnpj => this.dadoscnpjID = dadoscnpj.data);
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
            const value = req.body
            const inserted = await planets.insert(value)
            res.json(inserted)
            } catch (error) {
                next(error)
            
        }
    },
    getByCNPJ: async (req, res, next) => {
        try {
            const CNPJ = req.body   

            
            // Lucas: Abaixo é a função que vai buscar os links das aparições dos filmes de acordo com o nome do planeta pesquisado
           

           
            axios.get(`https://www.receitaws.com.br/v1/cnpj/${CNPJ.cnpj}`)
            .then(function (response) {    
                

                const CnpjResults = response.data                                                             
                        

                res.json({                   
                   CnpjResults
                    
                });
                console.log(CEPResults)
            
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
                   

            
            



        } catch (error) {
            next(error)
        }
    },
    userLogin: async (req, res, next) => {
        try {            
            const data = req.body                  
            const item2 = await planets.findOne({_cnpj: data})
            console.log(data)
            console.log(item2)
            
            if(!item2) {
                res.json("Nenhum email encontrado")
                console.log("Nenhum email encontrado")
            }
                res.json(item2)
                
        



        } catch (error) {
            next(error)
        }
    },
    getByName: async (req, res, next) => {
        try {
            
            const item = await planets.find({ "ADDRESS1.estado": req.query })
            res.json(item)

        } catch (error) {
            res.json(error)
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