const express = require('express')
const router = express.Router()
const environment = process.env.NODE_ENV || 'development'
const configuration = require('../../../knexfile')[environment]
const database = require('knex')(configuration)
const mealsController = require('../../../controllers/mealsController')
const mealFoodController = require('../../../controllers/mealFoodController')

router.get('/', mealsController.index)

router.get('/:id/foods', mealsController.show)

router.post('/:mealId/foods/:foodId', mealFoodController.create)

router.delete('/:mealId/foods/:foodId', mealFoodController.destroy)

module.exports = router
