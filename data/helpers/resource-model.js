const db = require("../db-config");
const get = () => {
  return db("resource");
};
const getById = id => {
  const query = db("resource");
  return query.where({ id }).first();
};
const insert = resource =>
  db("resource")
    .insert(resource)
    .then(([id]) => getById(id));
const remove = id => {
  return db("resource")
    .where({ id })
    .del();
};

const update = (changes, id) => {
  return db("resource")
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
