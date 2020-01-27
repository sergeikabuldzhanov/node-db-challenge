const express = require("express");
const router = express.Router();
const { get, getById, insert } = require("../data/helpers/task-model");
router.get("/", async (req, res, next) => {
  try {
    const tasks = await get();
    res.status(200).json(tasks);
  } catch (error) {
    next(error);
  }
});
router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const task = await getById(id);
    res.status(200).json(task);
  } catch (error) {
    next(error);
  }
});
router.post("/", async (req, res, next) => {
  const taskData = req.body;
  try {
    const newTaskId = await insert(taskData);
    res.status(201).json(newTaskId);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
