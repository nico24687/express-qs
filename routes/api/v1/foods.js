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
      res.json(food.rows[0])
    }
  })
})

router.post('/', (req,res,next) =>{
  let food = req.body.food
  let name = food.name 
  let calories = parseInt(food.calories)
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


router.put('/:id', (req,res,next) => {
  let food = req.body.food
  if(!food){
    return res.status(400).send({error: "Please have all details formatted correctly before making the request"})
  }
  let name = food.name 
  let calories = parseInt(food.calories)
  if(!name || !calories){
    return res.status(400).send({error: "You must include both name and calories"})
  }
  let id = req.params.id
  if(!id){
    return res.status(400).send({error: "Failed to update"})
  }
  database.raw(
    'UPDATE foods SET name = ?, calories = ? WHERE id = ? RETURNING *',
    [name, calories, id]
  ).then(food => {
    return food.rows[0]
  }).then(food => {
    res.status(200).json(food)
  })
})

//make it so you can only delete a food if it does not exist on a meal
router.delete('/:id', (req,res,next) => {
  let foodId = req.params.id 
  database.raw(
    'DELETE FROM foods WHERE id = ?',
    [foodId]
  ).then(food => {
    if(!food){
      return res.sendStatus(404)
    } else {
      res.sendStatus(204)
    }
  })
})

module.exports = router

