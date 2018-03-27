const Food = require('../models/food')


class FoodsController { 

  index(req, res, next) {
    Food.findAll().then(foods => {
      res.json(foods)
    })
  }

  show(req,res,next){
    let id = req.params.id
    Food.find(id).then((food) => {
      if(!food){
        return res.sendStatus(404)
      } else {
        res.json(food)
      }
    })
  }

  create(req,res,next){
    let food = req.body.food
    let name = food.name
    let calories = parseInt(food.calories)
    if (!name || !calories) {
      return res.status(400).send({ error: "No food info provided" })
    }
    Food.create(name,calories)
      .then((food) => {
        res.status(201).json(food)
      })
  }

  update(req,res,next){
    let food = req.body.food
    if (!food) {
      return res.status(400).send({ error: "Please have all details formatted correctly before making the request" })
    }
    let name = food.name
    let calories = parseInt(food.calories)
    if (!name || !calories) {
      return res.status(400).send({ error: "You must include both name and calories" })
    }
    let id = req.params.id
    if (!id) {
      return res.status(400).send({ error: "Failed to update" })
    }
    Food.update(id, name, calories)
      .then((food) => {
        res.json(food)
      })
  }

  destroy(req,res,next){
    let id = req.params.id 
    Food.destroy(id)
      .then(food => {
        res.sendStatus(204)
      })
  }



}

module.exports = new FoodsController()