const Meal = require('../models/meal')

class MealsController {

  static index(req, res, next) {
    Meal.findAll().then(foods => {
      res.json(foods)
    })
  }
}

module.exports = MealsController
