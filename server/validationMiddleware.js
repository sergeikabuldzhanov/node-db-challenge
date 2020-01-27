const projectDb = require("../data/helpers/project-model");
const checkProjectIdValid = async (req, res, next) => {
  const { id } = req.params;
  try {
    const project = await projectDb.getById(id);
    if (project) {
      req.project = project;
      next();
    } else {
      res.status(404).json({ message: `No project with matching id` });
    }
  } catch (error) {
    next(error);
  }
};
const validateProjectData = (req, res, next) => {
  if (req.body) {
    const { name } = req.body;
    if (name) {
      next();
    } else {
      res.status(400).json({ message: `Missing required fields` });
    }
  } else {
    res.status(400).json({ message: `Missing request body` });
  }
};
module.exports = {
  checkProjectIdValid,
  validateProjectData
};
