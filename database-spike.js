const environment = process.env.NODE_ENV || 'development'
const configuration = require('./knexfile')[environment]
const database = require('knex')(configuration)

database.raw('SELECT * FROM foods INNER JOIN meal_foods ON food.id = meal_foods.food_id INNER JOIN meals ON mf.meal_id = meal.id GROUP BY food.id')
  .then(data => {
    console.log(data.rows)
    process.exit()
  })

// SELECT m.*, json_agg(f.*) AS foods FROM meals m INNER JOIN meal_foods mf ON m.id = mf.meal_id INNER JOIN foods f ON mf.food_id = f.id GROUP BY m.id
