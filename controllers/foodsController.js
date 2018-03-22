const Food = require('../models/food')


class FoodsController { 

  index(req, res, next) {
    Food.getAll().then(foods => {
      res.json(foods.rows)
    })
  }

}

module.exports = new FoodsController()