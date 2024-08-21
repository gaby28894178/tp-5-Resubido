require('../models')

const request = require('supertest')
const app = require('../app')

const director = {
    firstName: "Steven",
    lastName: "Spielberg",
    nationality: "American",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/MKr25425_Steven_Spielberg_%28Berlinale_2023%29.jpg/1024px-MKr25425_Steven_Spielberg_%28Berlinale_2023%29.jpg",
    birthday: "1946-12-18"
}

let directorId

const BASE_URL = '/api/v1/directors'

test("Post 'BASE_URL should return status code 201 and res.body.firstName = director.firstNmae", async () => {

    const res = await request(app)
      .post(BASE_URL)
      .send(director)
  
    directorId = res.body.id
  
    expect(res.status).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(director.firstName)
  })

  test("Get BASE_URL' should return a statusCode 200", async () => {

    const res = await request(app)
      .get(BASE_URL)
  
    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
  
    
  })
  //! RUTAS DINAMICAS

  test("GET -> 'BASE_URL/:id', should return status code 200, res.body to be defined and res.body.firstName === director.firstName", async () => {

    const res = await request(app)
      .get(`${BASE_URL}/${directorId}`)
  
    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(director.firstName)
  
  })

 test("PUT -> 'BASE_URL/:id', should return status code 200, res.body.firstName ==== directorUpdate.firstName  ", async () => {

    const directorUpdate = {
        firstName: "William",
        lastName: "Wyler",
        nationality: "Swiss, German and American",
        image: "https://upload.wikimedia.org/wikipedia/commons/c/cd/William_Wyler_portrait.jpg",
        birthday: "1902-07-01"
    }
    const res = await request(app)
      .put(`${BASE_URL}/${directorId}`)
      .send(directorUpdate)
  
    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(directorUpdate.firstName)
    expect(res.body.lastName).toBe(directorUpdate.lastName)
    expect(res.body.nationality).toBe(directorUpdate.nationality)
    expect(res.body.image).toBe(directorUpdate.image)
    expect(res.body.birthday).toBe(directorUpdate.birthday)
  })

  test("Delete -> 'BASE_URL/:id', should return status code 204", async () => {

    const res = await request(app)
      .delete(`${BASE_URL}/${directorId}`)
       expect(res.statusCode).toBe(204)
  })

  