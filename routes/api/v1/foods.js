const express = require('express')
const router = express.Router()
const environment = process.env.NODE_ENV || 'development'
const configuration = require('../../../knexfile')[environment]
const database = require('knex')(configuration)
const foodsController = require('../../../controllers/foodsController')

router.get('/', foodsController.index)

router.get('/:id', foodsController.show)

router.post('/', foodsController.create )

router.put('/:id', foodsController.update)

router.delete('/:id', foodsController.destroy)

module.exports = router
