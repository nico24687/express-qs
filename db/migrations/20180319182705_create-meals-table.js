
exports.up = function(knex, Promise) {
  return knex.schema.createTable('meals', (table) => {
    table.increments('id').primary()
    table.string('name').unique().notNullable()
    table.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'))
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('meals')
}
