
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        {name: 'Xavier', cohort_id: 1},
        {name: 'Javier', cohort_id: 2},
        {name: 'Xavi', cohort_id: 3}
      ]);
    });
};
