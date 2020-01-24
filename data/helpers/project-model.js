const db = require("../db-config");
const { projectToBody, taskToBody } = require("./mappers");
const get = () => {
  const query = db("project");
  return query.then(projects => projects.map(projectToBody));
};
const getById = id => {
  const projectQuery = db("project")
    .where({ id })
    .first()
    .then(project => (project ? projectToBody(project) : null)); //returns a promise resolving to mapped project
  const taskQuery = db("task")
    .where({ project_id: id })
    .then(tasks => tasks.map(task => taskToBody(task))); //same as higher but resolves to an array of mapped tasks
  const resourceQuery = db("resource as r")
    .join("project_resource as pr", "r.id", "=", "pr.resource_id")
    .where({ project_id: id })
    .select("name");
  return Promise.all([projectQuery, taskQuery, resourceQuery]).then(
    ([project, tasks, resources]) =>
      project
        ? {
            ...project,
            tasks,
            resources
          }
        : null
  ); //returns a promise resolving to a project object with 'tasks' property added.
};
const insert = project =>
  db("project")
    .insert(project)
    .then(([id]) => getById(id));

const remove = id => {
  return db("project")
    .where({ id })
    .del();
};

const update = (changes, id) => {
  return db("project")
    .where({ id })
    .update(changes)
    .then(count => (count ? getById(id) : null));
};
module.exports = {
  get,
  getById,
  insert,
  remove,
  update
};
