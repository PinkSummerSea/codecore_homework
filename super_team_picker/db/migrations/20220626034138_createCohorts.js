/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('cohorts', table => {
    table.increments('id');
    table.text('name');
    table.text('logo_url');
    table.specificType('members_arr', 'text ARRAY');
    table.timestamp('createdAt').defaultTo(knex.fn.now());
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('cohorts')
};
