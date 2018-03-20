const express = require('express')
const router = express.Router()
const environment = process.env.NODE_ENV || 'development'
const configuration = require('../../../knexfile')[environment]
const database = require('knex')(configuration)



router.get('/', (req,res,next) => {
  database.raw(
    'SELECT * FROM foods'
  ).then( foods => {
    res.json(foods.rows)
  })
})


router.get('/:id',(req,res,next) => {
  let id = req.params.id 
  database.raw(
    'SELECT * FROM foods WHERE id = ?',
    [id]
  ).then( food => {
    if(!food.rows){
      return res.sendStatus(404)
    } else {
      res.json(food.rows)
    }
  })
})

router.post('/', (req,res,next) =>{
  let name = req.body.food
  let calories = req.body.calories
  if(!name || !calories){
    return res.status(422).send({error: "No food info provided"})
  }
  database.raw(
    'INSERT INTO foods(name, calories, created_at) VALUES (?,?) RETURNING *'
    [name, calories, new Date] 
  ).then(food => {
    res.status(201).json(food.rows)
  })
})

module.exports = router

