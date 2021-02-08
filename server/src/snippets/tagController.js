const express = require("express");
const auth = require("../middlewares/auth");
const router = express.Router();
const tagService = require("./tagService");

router.get("/", auth, getAll);
router.post("/", auth, create);
router.delete("/:id", auth, deleteTag);

module.exports = router;

async function getAll(req, res, next) {
    try {
        const response = await tagService.getAll();
        if (response) {
            return res.json(response);
        }
    } catch (err) {
        next(err);
    }
}

async function create(req, res, next) {
    try {
        await tagService.create(req.body);
        return res.json({}); 
    } catch (err) {
        next(err);
    }
}

async function deleteTag(req, res, next) {
    try {
        await tagService.deleteTag(req.params.id);
        return res.json({});
    } catch (err) {
        next(err);
    }
}