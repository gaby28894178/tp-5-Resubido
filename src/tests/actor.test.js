require('../models')

const request = require("supertest")
const app = require('../app');

let actorId;

const actor = {
    firstName: "Juan",
    lastName: "Yidi",
    nationality: "Colombian",
    image: "https://tse1.mm.bing.net/th?id=OIP.3TcIbaWAareGTaWHFwJDBgHaEk&pid=Api&P=0&h=180",
    birthday: "1995-03-18"
}


const BASE_URL = '/api/v1/actors'

test("POST BASE_URL, should return status code 201 and res.body.firstName === actor.firstName", async () => {

    const res = await request(app)
      .post(BASE_URL)
      .send(actor)

    actorId = res.body.id

    expect(res.status).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(actor.firstName)

})

test("GET BASE_URL, should return status 200, res.body to be defined and res.body.firstName === actor.firstName", async() =>{
    const res = await request(app)
      .get(BASE_URL)

      expect(res.status).toBe(200)
      expect(res.body).toBeDefined()
      expect(res.body).toHaveLength(1)

})

//! RUTAS DINAMICAS

test("GET -> '/BASE_URL/:id', should return status code 200, res.body to be defined and res.body.firstName === actor.firstName", async() =>{
    const res = await request(app)
      .get(`${BASE_URL}/${actorId}`)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(actor.firstName)
})

test("PUT -> '/BASE_URL/:id', should return code status code 200, res.body.firstName === actor.firstName ", async() => {

    const actorUpdate = {
        nationality: "Israeli",
        image: "https://www.biblia-es.org/wp-content/uploads/2018/06/rey-david.jpg"
    }

    const res = await request(app)
      .put(`${BASE_URL}/${actorId}`)
      .send(actorUpdate)

      expect(res.status).toBe(200)
      expect(res.body).toBeDefined()
      expect(res.body.nationality).toBe(actorUpdate.nationality)
      expect(res.body.image).toBe(actorUpdate.image)
})

test("DELETE -> '/BASE_URL/:id', should return statusCode 204", async () => {
    const res = await request(app)
      .delete(`${BASE_URL}/${actorId}`)
      expect(res.statusCode).toBe(204)
})

