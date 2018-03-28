const environment = process.env.NODE_ENV || 'development'
const configuration = require('../knexfile')[environment]
const database = require('knex')(configuration)

class MealFood {

  static find(meal_id, food_id) {
    return database.raw('SELECT * FROM meal_foods WHERE meal_foods.meal_id = ? AND meal_foods.food_id = ?',
     [meal_id, food_id])
    .then(mealFood => {
      return database.raw('SELECT m.name AS meal_name, f.name AS food_name FROM foods f INNER JOIN meal_foods mf ON mf.food_id = f.id INNER JOIN meals m ON mf.meal_id = m.id WHERE m.id = ? AND f.id = ? LIMIT 1',
       [meal_id, food_id])
    .then(mealFood => {
      return mealFood.rows[0]
      })
    })
  }
  static create(meal_id, food_id) {
      return database.raw(
        'INSERT INTO meal_foods (meal_id, food_id) VALUES (?, ?) RETURNING *',
        [meal_id, food_id])
      .then(mealFood => {
      return database.raw(
        'SELECT m.name AS meal_name, f.name AS food_name FROM foods f INNER JOIN meal_foods mf ON mf.food_id = f.id INNER JOIN meals m ON mf.meal_id = m.id WHERE m.id = ? AND f.id = ? LIMIT 1',
        [meal_id, food_id])
      .then(mealFood => {
      return mealFood.rows[0]
      })
    })
  }


  static delete(meal_id, food_id) {
      return database.raw(
        'DELETE FROM meal_foods WHERE meal_foods.meal_id = ? AND meal_foods.food_id = ? RETURNING *',
        [meal_id, food_id])
      .then((response) => {
        return database.raw('SELECT meals.name FROM meals WHERE meals.id = ? UNION SELECT foods.name FROM foods WHERE foods.id = ?',
        [meal_id, food_id])
      .then(mealFoods => {
      return mealFoods.rows
      })
    })
  }
}


module.exports = MealFood
