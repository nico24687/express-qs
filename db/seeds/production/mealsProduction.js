exports.seed = function (knex, Promise) {
  return knex.raw('TRUNCATE meals CASCADE ')
    .then(function () {
      return Promise.all([
        knex('meals').insert([{ name: "Breakfast" }, { name: "Lunch" },
        { name: "Dinner" }, { name: "Snacks" }])
      ])
    })
}