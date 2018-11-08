exports.up = (knex, Promise) => {
  return knex.schema.createTable('users', (table) => {
    table.increments('id').primary();
    table.string('access_token', 255);
    table.string('name', 255).unique().notNullable();
    table.string('email', 255).unique().notNullable();
    table.string('password', 255).notNullable();
    table.string('roles', 'longtext').defaultTo('["ROLE_USER"]');
    // table.boolean('is_staff').defaultTo(false);
    // table.string('role').defaultTo('admin');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
    // table.timestamps();
  });
};

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('users');
};
