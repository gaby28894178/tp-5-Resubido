require('../models')

const request = require('supertest')
const app = require('../app')
const Actor = require('../models/Actor')
const Director = require('../models/Director')
const Genre = require('../models/Genre')

const movie = {
    name: "The Lord of the Rings, the return of the king",
    image: "https://upload.wikimedia.org/wikipedia/en/4/48/Lord_Rings_Return_King.jpg",
    synopsis: "Gandalf and Aragorn lead the World of Men, and they will try to attract Sauron's attention to give Frodo the last chance to complete his mission and thus try to avoid succumbing to the continued temptations of the Ring.",
    releaseYear: 2003
}

let movieId

const BASE_URL = '/api/v1/movies'

test("Post 'BASE_URL should return status code 201 and res.body.name = movie.name", async () => {

    const res = await request(app)
      .post(BASE_URL)
      .send(movie)
  
    movieId = res.body.id
  
    expect(res.status).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(movie.name)
  })

test("Get BASE_URL' should return a statusCode 200", async () => {

    const res = await request(app)
      .get(BASE_URL)
  
    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
  
    expect(res.body[0].actors).toBeDefined()
    expect(res.body[0].actors).toHaveLength(0)
    expect(res.body[0].genres).toBeDefined()
    expect(res.body[0].genres).toHaveLength(0)
    expect(res.body[0].directors).toBeDefined()
    expect(res.body[0].directors).toHaveLength(0)
  })

//? RUTAS DINAMICAS

test("GET -> 'BASE_URL/:id', should return status code 200, res.body to be defined and res.body.firstName === director.firstName", async () => {

    const res = await request(app)
      .get(`${BASE_URL}/${movieId}`)
  
    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(movie.name)
  
  })

test("PUT -> 'BASE_URL/:id', should return status code 200, res.body.name ==== movieUpdate.name  ", async () => {

    const movieUpdate = {
        name: "The Lord of the Rings, the return of the king",
        image: "https://upload.wikimedia.org/wikipedia/en/4/48/Lord_Rings_Return_King.jpg",
        synopsis: "Gandalf and Aragorn lead the World of Men, and they will try to attract Sauron's attention to give Frodo the last chance to complete his mission and thus try to avoid succumbing to the continued temptations of the Ring.",
        releaseYear: 2003
    }
    const res = await request(app)
      .put(`${BASE_URL}/${movieId}`)
      .send(movieUpdate)
  
    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(movieUpdate.name)
    expect(res.body.image).toBe(movieUpdate.image)
    expect(res.body.synopsis).toBe(movieUpdate.synopsis)
    expect(res.body.releaseYear).toBe(movieUpdate.releaseYear)
  })
test("POST -> /BASE_URL/:id/actors, should return code 200, and res.body.length === 1 ", async () => {
    const actor = {
        firstName: "Juan",
        lastName: "Yidi",
        nationality: "Colombian",
        image: "https://tse1.mm.bing.net/th?id=OIP.3TcIbaWAareGTaWHFwJDBgHaEk&pid=Api&P=0&h=180",
        birthday: "1995-03-18"
    }
    const createActors = await Actor.create(actor)
    const res = await request(app)
      .post(`${BASE_URL}/${movieId}/actors`)
      .send([createActors.id])
    // console.log(res.body);
    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
    expect(res.body[0].id).toBeDefined()
    expect(res.body[0].id).toBe(createActors.id)
    await createActors.destroy()
  })

test("POST -> /BASE_URL/:id/directors, should return code 200, and res.body.length === 1 ", async () => {
    const director = {
        firstName: "Steven",
        lastName: "Spielberg",
        nationality: "American",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/MKr25425_Steven_Spielberg_%28Berlinale_2023%29.jpg/1024px-MKr25425_Steven_Spielberg_%28Berlinale_2023%29.jpg",
        birthday: "1946-12-18"
    }
    const createDirectors = await Director.create(director)
    const res = await request(app)
      .post(`${BASE_URL}/${movieId}/directors`)
      .send([createDirectors.id])
    // console.log(res.body);
    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
    expect(res.body[0].id).toBeDefined()
    expect(res.body[0].id).toBe(createDirectors.id)
    await createDirectors.destroy()
  })

test("POST -> /BASE_URL/:id/genres, should return code 200, and res.body.length === 1 ", async () => {
    const genre = {
        name: "Suspense"
    }
    const createGenres = await Genre.create(genre)
    const res = await request(app)
      .post(`${BASE_URL}/${movieId}/genres`)
      .send([createGenres.id])
    // console.log(res.body);
    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
    expect(res.body[0].id).toBeDefined()
    expect(res.body[0].id).toBe(createGenres.id)
    await createGenres.destroy()
  })

test("DELETE -> '/BASE_URL/:id', should return statusCode 204", async () => {
    const res = await request(app)
      .delete(`${BASE_URL}/${movieId}`)
       expect(res.statusCode).toBe(204)
})




  
