
exports.up = function(knex, Promise) {
  return knex.schema.createTable('foods', (t) => {
    t.increments('id').primary()
    t.string('name').unique().notNullable()
    t.string('calories').notNullable()
    t.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'))
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('foods')
}
