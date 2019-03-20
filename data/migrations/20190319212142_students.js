
exports.up = function(knex, Promise) {
  return knex.schema.createTable('students', tbl => {
    tbl.increments();
    tbl.string('name', 128)
      .notNullable();

    tbl.integer('cohort_id')
        .unsigned()
        .references('id')
        .inTable('chorts')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('students');
};
