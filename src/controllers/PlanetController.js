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
                var xhr = new XMLHttpRequest();
                xhr.open ("GET", "http://cep.la/65081264", true);
                xhr.setRequestHeader ("Accept", "application/json");
                xhr.onreadystatechange = function(){
                if((xhr.readyState == 0 || xhr.readyState == 4) && xhr.status == 200)
                    res.json(xhr.responseText)
                };
                xhr.send (null);
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
    getByCEP: async (req, res, next) => {
        try {
            const { CEP } = req.body        

            
            // Lucas: Abaixo é a função que vai buscar os links das aparições dos filmes de acordo com o nome do planeta pesquisado
           

           
            axios.get(`http://cep.la/24030-111`)
            .then(function (response) {    
                

                const CEPResults = response.data
                                                             
                            

                res.json({                   
                    Films: CEPResults,
                    CEP
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