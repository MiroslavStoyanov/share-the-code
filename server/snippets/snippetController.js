const express = require("express");
const router = express.Router();
const snippetService = require("./snippetService");

router.get("/", getAll);
router.get("/:id", getById);
router.get("/user/:userId", getUserSnippets);
router.post("/", create);
router.put("/:id", update);
router.delete("/:id", deleteSnippet);

module.exports = router;

async function getAll(req, res, next) {
    try {
        const response = await snippetService.getAll();
        if (response) {
            return res.json(response);
        }
    } catch (err) {
        next(err);
    }
}

async function getById(req, res, next) {
    try {
        const snippet = await snippetService.getById(req.params.id);
        if(snippet) {
            return res.json(snippet);
        } else {
            return res.sendStatus(404);
        }
    } catch (err) {
        next(err);
    }
}

async function getUserSnippets(req, res, next) {
    try {
        const snippets = await snippetService.getUserSnippets(req.params.userId);
        if(snippets) {
            return res.json(snippets);
        } else {
            return res.sendStatus(404);
        }
    } catch (err) {
        next(err);
    }
}

async function create(req, res, next) {
    try {
        await snippetService.create(req.body);
        return res.json({}); 
    } catch (err) {
        next(err);
    }
}

async function update(req, res, next) {
    try {
        await snippetService.update(req.params.id, req.body);
        return res.json({});
    } catch (err) {
        next(err);
    }
}

async function deleteSnippet(req, res, next) {
    try {
        await snippetService.deleteSnippet(req.params.id);
        return res.json({});
    } catch (err) {
        next(err);
    }
}