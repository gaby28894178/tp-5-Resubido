require('../models')

const request = require("supertest")
const app = require("../app");


let genreId;

const BASE_URL = '/api/v1/genres'

const genre = {
    name: "Suspense"
}

test("POST -> BASE_URL, should return statusCode 201 and res.body.name === genre.name", async () =>{
    const res = await request(app)
      .post(BASE_URL)
      .send(genre)

    genreId = res.body.id

    expect(res.status).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(genre.name)
})

test("GET -> BASE_URL, should return statusCode 200, res.body to be defined and res.body.name === genre.name", async () =>{

    const res = await request(app)
       .get(BASE_URL)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)

})
//! RUTAS DINAMICAS

test("GET -> 'BASE_URL/:id', should return status code 200, res.body to be defined and res.body.name === genre.name", async () => {

    const res = await request(app)
      .get(`${BASE_URL}/${genreId}`)
  
    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(genre.name)
  
  })

test("PUT -> 'BASE_URL/:id', should return status code 200, res.body.name ==== genreUpdate.name  ", async () => {

    const genreUpdate = {
      name: "Action"
    }
    const res = await request(app)
      .put(`${BASE_URL}/${genreId}`)
      .send(genreUpdate)
  
    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(genreUpdate.name)
   
  })

test("Delete -> 'BASE_URL/:id', should return status code 204", async () => {

    const res = await request(app)
      .delete(`${BASE_URL}/${genreId}`)
       expect(res.statusCode).toBe(204)
  })
  