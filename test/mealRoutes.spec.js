const chai = require('chai')
const should = chai.should()
const chaiHttp = require('chai-http')
chai.use(chaiHttp)

const environment = process.env.NODE_ENV || 'test'
const configuration = require('../knexfile.js')[environment]
const database = require('knex')(configuration)
const server = require('../app.js')


describe('API routes', () => {

  before(done => {
    database.migrate.latest()
    .then(() => done())
    .catch(error => {
      throw error
    })
    .done()
  })

  beforeEach((done) => {
    database.seed.run()
    .then(() => done())
    .catch(error => {
      throw errir
    })
    .done()
  })

  xdescribe('GET /api/v1/meals', () => {
    it('should return all meals with their associated foods', () => {
      return chai.request(server)
      .get('/api/v1/meals')
      .then(response => {
        response.should.have.status(200)
        response.should.be.json
        response.should.be.a('array')
        response.body[0].should.have.property('id')
        response.body[0].id.should.equal(1)
        response.body[0].should.have.property('name')
        response.body[0].name.should.equal('Breakfast')
        response.body[0].should.have.property('foods')
        response.body[1].name.should.equal("Snack")
        response.body[2].name.should.equal("Lunch")
        response.body[3].name.should.equal("Dinner")
      })
      .catch( error => {
        throw error 
      })
    })
  })

  xdescribe('GET /api/v1/meals/:meal_id/foods', () => {
    it("returns an array of foods for a given meal", () => {
      return chai.request(server)
      .get('/api/v1/meals/2/foods')
      .then(response => {
        response.should.have.status(200)
        response.should.be.json
        response.body.should.be.a('object')
        response.body.should.have.property('id')
        response.body.id.should.equal(2)
        response.body.should.have.property('name')
        response.body.name.should.equal("Snack")
        response.body.should.have.property('foods')
        response.body.foods.should.be.a('array')
        response.body.foods[0].should.be.a('object')
        response.body.foods[0].should.have.property('id')
        response.body.foods[0].should.have.property('name')
        response.body.foods[0].name.should.be.a('string')
        response.body.foods[0].should.have.property('calories')
        response.body.foods[0].calories.should.be.a('number')
      }).catch(error => {
        throw error 
      })
    })
    it('returns a 404 for a non existing meal record', () => {
      return chai.request(server)
      .get('/api/v1/meals/999/foods')
      .then(response => {
        response.should.have.status(404)
      }).catch(error => {
        throw error
      })
    })
  })

  xdescribe('POST /api/v1/meals/:meal_id/foods/:id', () => {
    it("makes a new record in the meal_foods table", () => {
      return chai.request(server)
      .post('/api/v1/meals/2/13')
      .then(response => {
        response.should.have.status(201)
        response.should.be.json
        response.body.should.be.a('object')
        response.body.message.should.include('Added')
      })
      .catch(error => {
        throw error
      })
    })
  })

})