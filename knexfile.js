const path = require('path');
const dotenv = require('dotenv');

dotenv.load();

const options = {
  client: 'mysql',
  connection: process.env.NODE_ENV === 'test' ? process.env.DATABASE_URL + '_test' : process.env.DATABASE_URL,
  debug: process.env.NODE_ENV === 'development',
  pool: {
    min: 2,
    max: 10,
    afterCreate(connection, callback) {
      connection.query("SET time_zone = '+00:00';", (err) => {
        callback(err, connection);
      });
    },
  },
  migrations: {
    tableName: 'knex_migrations',
    directory: path.join(__dirname, '/knex/migrations'),
  },
  seeds: {
    directory: path.join(__dirname, '/knex/seeds'),
  },
};

module.exports = {
  development: {
    ...options,
  },
  test: {
    ...options,
  },
  production: {
    ...options,
  },
};
