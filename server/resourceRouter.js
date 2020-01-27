const express = require("express");
const router = express.Router();
const { get, getById, insert } = require("../data/helpers/resource-model");
router.get("/", async (req, res, next) => {
  try {
    const resources = await get();
    res.status(200).json(resources);
  } catch (error) {
    next(error);
  }
});
router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const resource = await getById(id);
    res.status(200).json(resource);
  } catch (error) {
    next(error);
  }
});
router.post("/", async (req, res, next) => {
  const resourceData = req.body;
  try {
    const newResourceId = await insert(resourceData);
    res.status(201).json(newResourceId);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
