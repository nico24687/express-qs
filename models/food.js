const environment = process.env.NODE_ENV || 'development'
const configuration = require('../knexfile')[environment]
const database = require('knex')(configuration)

class Food {
  getAll(){
    return database.raw(
      'SELECT * FROM foods'
    )
  }
}


module.exports = new Food()