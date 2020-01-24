exports.up = function(knex) {
  return knex.schema
    .createTable("project", project_table => {
      project_table.increments();
      project_table.text("name").notNullable();
      project_table.text("description");
      project_table.boolean("completed").notNullable();
    })
    .createTable("resource", resource_table => {
      resource_table.increments();
      resource_table.text("name").notNullable();
      resource_table.text("description");
    })
    .createTable("context", context_table => {
      context_table.increments();
      context_table.text("name").notNullable();
    })
    .createTable("task", task_table => {
      task_table.increments();
      task_table.text("description").notNullable();
      task_table.text("notes");
      task_table.boolean("completed").notNullable();
      task_table
        .integer("project_id")
        .unsigned()
        .references("id")
        .inTable("project")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    })
    .createTable("project_resource", project_resource_table => {
      project_resource_table.increments();
      project_resource_table
        .integer("project_id")
        .unsigned()
        .references("id")
        .inTable("project")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      project_resource_table
        .integer("resource_id")
        .unsigned()
        .references("id")
        .inTable("resource")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    })
    .createTable("context_task", context_task_table => {
      context_task_table.increments();
      context_task_table
        .integer("context_id")
        .unsigned()
        .references("id")
        .inTable("context")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      context_task_table
        .integer("task_id")
        .unsigned()
        .references("id")
        .inTable("task")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists("context_task")
    .dropTableIfExists("project_resource")
    .dropTableIfExists("task")
    .dropTableIfExists("context")
    .dropTableIfExists("resource")
    .dropTableIfExists("project");
};
