const express = require("express");
const auth = require("../middlewares/auth");
const router = express.Router();
const tagService = require("./tagService");

router.get("/", auth, getAll);
router.post("/", auth, create);
router.delete("/:id", auth, deleteTag);

module.exports = router;

async function getAll(_, res, _) {
  try {
    const response = await tagService.getAll();
    if (response) {
      return res.json(response);
    }
    return res.sendStatus(404);
  } catch (err) {
    res.status(400).json({ error: err.message, stack: err.stack });
  }
}

async function create(req, res, _) {
  try {
    await tagService.create(req.body);
    return res.json({});
  } catch (err) {
    res.status(400).json({ error: err.message, stack: err.stack });
  }
}

async function deleteTag(req, res, _) {
  try {
    await tagService.deleteTag(req.params.id);
    return res.json({});
  } catch (err) {
    res.status(400).json({ error: err.message, stack: err.stack });
  }
}
