const Meal = require('../models/meal')

class MealsController {

  static index(req, res, next) {
    Meal.findAll().then(foods => {
      res.json(foods)
    })
  }

  static show(req, res, next) {
    let id = req.params.id
    Meal.find(id).then(meal => {
      if(!meal) {
        return res.sendStatus(404)
      } else {
        return res.json(meal)
      }
    })
  }
}

module.exports = MealsController
