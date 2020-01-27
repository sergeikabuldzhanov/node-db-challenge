exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("context_task")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("context_task").insert([
        {
          context_id: 1,
          task_id: 1
        },
        {
          context_id: 2,
          task_id: 1
        },
        {
          context_id: 3,
          task_id: 2
        }
      ]);
    });
};
