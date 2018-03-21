
exports.up = function(knex, Promise) {
  return knex.schema.createTable('meal_foods', (table) => {
    table.increments('id').primary()
    table.integer('meal_id').unsigned()
    table.foreign('meal_id').references('meals.id').onDelete('CASCADE').onUpdate('CASCADE')
    table.integer('food_id').unsigned()
    table.foreign("food_id").references('foods.id').onDelete('CASCADE').onUpdate('CASCADE')
    table.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'))
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('meal_foods')
};
