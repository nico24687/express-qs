const express = require('express')
const router = express.Router()
const environment = process.env.NODE_ENV || 'development'
const configuration = require('../../../knexfile')[environment]
const database = require('knex')(configuration)
const mealsController = require('../../../controllers/mealsController')

// router.get('/', (req,res,next) => {
//   database.raw(
//     'SELECT m.*, json_agg(f.*) AS foods FROM meals m INNER JOIN meal_foods mf ON m.id = mf.meal_id INNER JOIN foods f ON mf.food_id = f.id GROUP BY m.id'
//   ).then(meals => {
//     res.json(meals.rows)
//   })
// })

router.get('/', mealsController.index)

router.get('/:meal_id/foods' (req, res, next) => {
  database.raw(
    'SELECT m.*, json_agg(f.*) AS foods FROM meals m INNER JOIN meal_foods mf ON m.id = mf.meal_id INNER JOIN foods f ON mf.food_id = f.id where m.id = ? GROUP BY m.id',
      [meal_id]
  ).then(meal => {
    res.json(meal.rows[0])
  })
}


module.exports = router
