const MealFood = require('../models/mealFood')

class MealFoodController {

  static create(req, res, next) {
    let mealId = req.params.mealId
    let foodId = req.params.foodId

    MealFood.create(mealId, foodId)
      .then(mealFood => {
        if(!mealFood) {
          return res.sendStatus(404)
        } else {
          return res.status(201).send({message: `Added ${mealFood.food_name} to ${mealFood.meal_name}`})
          // return res.json(mealFood)
      }
    })
  }


}

module.exports = MealFoodController
