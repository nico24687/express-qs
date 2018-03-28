// Update with your config settings.

module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/quantified_self',
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds/dev'
    },
    useNullAsDefault: true
  },

  test: {
    client: 'pg',
    connection: 'postgres://localhost/quantified_self_test',
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds/test'
    },
    useNullAsDefault: true
  },


  production: {
    client: 'pg',
    connection: "postgres://qnurfjcsszdsug:0610cab9aeeec2ef76d8180e86506f23ea33150e4531f3ff4dbe2feb266d3c1d@ec2-107-21-126-193.compute-1.amazonaws.com:5432/d5jbkdep86bl9i",
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds/production'
    },
    useNullAsDefault: true
  }
}
