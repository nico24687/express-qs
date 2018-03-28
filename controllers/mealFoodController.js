const MealFood = require('../models/mealFood')

class MealFoodController {

  static create(req, res, next) {
    let mealId = req.params.mealId
    let foodId = req.params.foodId

    MealFood.create(mealId, foodId)
      .then(mealFood => {
        if(!mealFood) {
          return res.sendStatus(404)
        }
        else {
          return res.status(201).send({message: `Added ${mealFood.food_name} to ${mealFood.meal_name}`})
        }
    })
  }

  static destroy(req, res, next) {
    let mealId = req.params.mealId
    let foodId = req.params.foodId

    let mealFood = MealFood.find(mealId, foodId)

    Promise.all([mealFood])
      .then(mealFood => {
        if (!mealFood[0]) {
          return res.sendStatus(404)
        }
        else {
          MealFood.delete(mealId, foodId)
          .then(response => {
            res.status(200).send({
              message: `Removed ${response[1].name} from ${response[0].name}`
          })
        })
      }
    })
  }
}

module.exports = MealFoodController
