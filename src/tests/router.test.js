const request = require('supertest')
const app = require('../server')

describe("sample test", () => {
   it("should get ping route", async () => {
       const res = await request(app).get('/ping')
       expect(res.statusCode).toEqual(200)
   }
)})
describe("sample test", () => {
   it("should get planets route", async () => {
       const res = await request(app).get('/planets')
       expect(res.statusCode).toEqual(200)
   }
)})
describe("sample test", () => {
   it("should get planet id route", async () => {
       const res = await request(app).get('/planets/602544646ad5d88e307ef0cd')
       expect(res.statusCode).toEqual(200)
   }
)})
describe("sample test", () => {
   it("should get planet id route", async () => {
       const res = await request(app).delete('/planets/602596dd4da65207544aac17')
       expect(res.statusCode).toEqual(200)
   }
)})
describe("sample test", () => {
   it("should get planet id route", async () => {
       const res = await request(app).post('/planets')
       .send({
         name: "Jest Planet",
         climate: "vsCode",
         terrain: "javascript"
       })
       expect(res.statusCode).toEqual(200)
   }
)})
describe("sample test", () => {
   it("should get planet id route", async () => {
       const res = await request(app).put('/planets/602595eb3b8608060d6edbac')
       .send({
         name: "Jest Planet",
         climate: "vsCode",
         terrain: "javascript"
       })
       expect(res.statusCode).toEqual(200)
   }
)})

