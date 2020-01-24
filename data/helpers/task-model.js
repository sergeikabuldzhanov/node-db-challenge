const db = require("../db-config");
const { taskToBody } = require("./mappers");
const get = () => {
  const query = db("task");
  return query.then(tasks => tasks.map(taskToBody));
};
const getById = id => {
  const taskQuery = db("task")
    .where({ id })
    .first()
    .then(task => taskToBody(task));
  const contextQuery = db("context")
    .join("context_task", "context_task.context_id", "=", "context.id")
    .where({ task_id: id })
    .select("name");
  return Promise.all([taskQuery, contextQuery]).then(([task, contexts]) => ({
    ...task,
    contexts
  }));
};
const insert = task =>
  db("task")
    .insert(task)
    .then(([id]) => getById(id));
const remove = id => {
  return db("task")
    .where({ id })
    .del();
};

const update = (changes, id) => {
  return db("task")
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
