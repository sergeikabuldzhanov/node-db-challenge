exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("task")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("task").insert([
        {
          description: "Rob a bank",
          notes: "task1",
          completed: false,
          project_id: 1
        },
        {
          description: "Rob a robbers hideout",
          notes: "task2",
          completed: true,
          project_id: 2
        },
        {
          description: "Rob a jewelry store",
          notes: "task3",
          completed: false,
          project_id: 3
        }
      ]);
    });
};
