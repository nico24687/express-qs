const environment = process.env.NODE_ENV || 'development'
const configuration = require('../knexfile')[environment]
const database = require('knex')(configuration)

class Food {
  findAll(){
    return database.raw(
      'SELECT * FROM foods'
    ).then(food => {
      return food.rows
    })
  }

  find(id){
    return database.raw(
      'SELECT * FROM foods WHERE id = ?',
      [id]
    ).then( food => {
      return food.rows[0]
    })
  }

  create(name,calories){
    return database.raw(
      'INSERT INTO foods (name, calories) VALUES (?,?) RETURNING *',
      [name, calories]
    ).then(food => {
      return food.rows[0]
    })
  }

  update(id, name, calories){
    return database.raw(
      'UPDATE foods SET name = ?, calories = ? WHERE id = ? RETURNING *',
      [name, calories, id]
    ).then(food => {
      return food.rows[0]
    })
  }

  destroy(id){
    return database.raw(
      'DELETE FROM foods WHERE id = ?',
      [id]
    )
  }



}


module.exports = new Food()