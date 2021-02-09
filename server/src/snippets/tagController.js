const express = require("express");
const auth = require("../middlewares/auth");
const router = express.Router();
const tagService = require("./tagService");

router.get("/", auth, getAll);
router.get("/:name", getBySnippetName)
router.post("/", auth, create);
router.delete("/:id", auth, deleteTag);

module.exports = router;

async function getAll(_, res, _) {
  try {
    const response = await tagService.getAll();
    if (response) {
      return await res.json(response);
    }
    return await res.sendStatus(404);
  } catch (err) {
    await res.status(400).json({ error: err.message, stack: err.stack });
  }
}

async function getBySnippetName(req, res, _) {
  try {
    const response = await tagService.getBySnippetName(req.params.name);
    if (response) {
      return await res.json(response);
    }
    return await res.sendStatus(404);
  } catch (err) {
    await res.status(400).json({ error: err.message, stack: err.stack });
  }
}

async function create(req, res, _) {
  try {
    await tagService.create(req.body);
    return await res.json({});
  } catch (err) {
    await res.status(400).json({ error: err.message, stack: err.stack });
  }
}

async function deleteTag(req, res, _) {
  try {
    await tagService.deleteTag(req.params.id);
    return await res.json({});
  } catch (err) {
    await res.status(400).json({ error: err.message, stack: err.stack });
  }
}
