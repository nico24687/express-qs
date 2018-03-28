const express = require('express')
const router = express.Router()
const environment = process.env.NODE_ENV || 'development'
const configuration = require('../../../knexfile')[environment]
const database = require('knex')(configuration)
const mealsController = require('../../../controllers/mealsController')
const mealFoodController = require('../../../controllers/mealFoodController')

router.get('/', mealsController.index)

router.get('/:id/foods', mealsController.show)

router.post('/:id/foods', mealFoodController.create)

router.delete('/:id/foods/:id', mealFoodController.destroy)


module.exports = router
