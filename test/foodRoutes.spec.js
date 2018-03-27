const chai = require('chai')
const should = chai.should()
const chaiHttp = require('chai-http')
chai.use(chaiHttp)

const environment = process.env.NODE_ENV || 'development'
const configuration = require('../knexfile.js')[environment]
const database = require('knex')(configuration)
const server = require('../app.js')


describe("API routes", () => {
  before((done) => {
    database.migrate.latest()
      .then(() => done())
      .catch(error => {
        throw error;
      })
      .done();

  });

  beforeEach((done) => {
    database.seed.run()
      .then(() => done())
      .catch(error => {
        throw error;
      })
      .done();
  });

  describe('GET /api/v1/foods', () => {
    it("returns all foods back to us", () => {
      return chai.request(server)
      .get('/api/v1/foods')
      .then(response => {
        response.should.have.status(200)
        response.should.be.json
        response.body.should.be.a('array')
        response.body[0].should.have.property('id')
        response.body[0].should.have.property('name')
        response.body[0].should.have.property('calories')
      }).catch(error => {
        throw error 
      })
    })
  })

  describe('GET /api/v1/foods/:id', () => {
    it("returns a single food", () => {
      return chai.request(server)
      .get('/api/v1/foods/1')
      .then(response => {
        response.should.have.status(200)
        response.should.be.json
        response.body.should.be.a('object')
        response.body.should.have.property('id')
        response.body.id.should.equal(1)
        response.body.should.have.property('name')
        response.body.should.have.property('calories')
      }).catch(error => {
        throw error 
      })
    })
    it("retuns a 404 for a food that does not exist", ()=>{
      return chai.request(server)
        .get('/api/v1/foods/9999')
        .then(response => {
          response.should.have.status(404)
        }).catch(error => {
          throw error
        })
    })
  })

  describe(' POST /api/v1/foods', () => {
    it("creates a new food and returns it as json", ()=> {
      database.raw(
        'SELECT * FROM foods'
      ).then(foods => {
        console.log(foods.rows.map(food => food.name).join(","))
      })
      return chai.request(server)
      .post('/api/v1/foods')
      .send({food: {name: 'Fredo Bar', calories: 200 } })
      .then(response => {
        response.should.have.status(201)
        response.should.be.json
        response.body.should.be.a('object')
        response.body.should.have.property('id')
        response.body.should.have.property('name')
        response.body.should.have.property('calories')
        response.body.name.should.equal('Fredo Bar')
        response.body.calories.should.equal(200)
      })
    })
  })

  describe('PUT /api/v1/foods/:id', () => {
    it("updates a food and returns it as json", () => {
      return chai.request(server)
      .put('/api/v1/foods/1')
      .send({food: {name: 'Bounty Bar', calories: 200}})
      .then(response => {
        response.should.have.status(200)
        response.should.be.json 
        response.body.should.be.a('object')
        response.body.should.have.property('id')
        response.body.id.should.equal(1)
        response.body.should.have.property('name')
        response.body.name.should.equal('Bounty Bar')
        response.body.should.have.property('calories')
        response.body.calories.should.equal(200)
      }).catch(error => {
        throw error 
      })
    })
  })

  describe('DELETE /api/v1/foods/:id', () => {
    it("deletes a given food and returns a 204", () => {
      return chai.request(server)
      .delete('/api/v1/foods/1')
      .then(response => {
        response.should.have.status(204)
      }).catch(error => {
        throw error 
      })
    })
  })



})