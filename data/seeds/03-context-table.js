exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("context")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("context").insert([
        {
          name: "context1"
        },
        {
          name: "context2"
        },
        {
          name: "context3"
        }
      ]);
    });
};
