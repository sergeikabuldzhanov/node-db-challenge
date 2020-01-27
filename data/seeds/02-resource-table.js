exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("resource")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("resource").insert([
        {
          name: "Resource1",
          description: "BOB a bank"
        },
        {
          name: "Resource2",
          description: "BOB a BOBbers hideout"
        },
        {
          name: "Resource3",
          description: "BOB a jewelry store"
        }
      ]);
    });
};
