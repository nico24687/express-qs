const express = require('express')
const router = express.Router()
const environment = process.env.NODE_ENV || 'development'
const configuration = require('../../../knexfile')[environment]
const database = require('knex')(configuration)

router.get('/', (req,res,next) => {
  database.raw(
    'SELECT * FROM meals'
  ).then(meals => {
    return meals.rows
  })
})