const express = require("express");
const {checkProjectIdValid, validateProjectData} = require('./validationMiddleware')
const router = express.Router();
const {
  get,
  getById,
  insert,
  remove,
  update
} = require("../data/helpers/project-model");
router.get("/", async (req, res, next) => {
  try {
    const projects = await get();
    res.status(200).json(projects);
  } catch (error) {
    next(error);
  }
});
router.get("/:id", checkProjectIdValid, async (req, res, next) => {
  const { id } = req.params;
  try {
    const project = await getById(id);
    res.status(200).json(project);
  } catch (error) {
    next(error);
  }
});
router.post("/", validateProjectData,async (req, res, next) => {
  const projectData = req.changes;
  try {
    const newProjectId = await insert(projectData);
    res.status(201).json(newProjectId);
  } catch (error) {
    next(error);
  }
});
router.delete("/:id", checkProjectIdValid, async (req, res, next) => {
  const { id } = req.params;
  try {
    await remove(id);
    res.status(200).json(req.project);
  } catch (error) {
    next(error);
  }
});
router.put("/:id", checkProjectIdValid, validateProjectData, async (req, res, next) => {
  const { id } = req.params;
  try {
    const updated = await update(req.changes, id);
    if (updated) {
      res.status(200).json(updated);
    } else {
      res.status(500).json({ message: `Couldn't update project` });
    }
  } catch (error) {
    next(error);
  }
});



module.exports = router;
