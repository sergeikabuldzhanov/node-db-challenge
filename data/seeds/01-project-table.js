exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("project")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("project").insert([
        {
          name: "Project1",
          description: "Rob a bank",
          completed: false
        },
        {
          name: "Project2",
          description: "Rob a robbers hideout",
          completed: true
        },
        {
          name: "Project3",
          description: "Rob a jewelry store",
          completed: false
        }
      ]);
    });
};
