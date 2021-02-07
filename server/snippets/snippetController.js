const express = require("express");
const auth = require("../config/auth");
const router = express.Router();
const snippetService = require("./snippetService");

router.get("/", getAll);
router.get("/:id", getById);
router.get("/name/:name", getByName);
router.get("/user/:userId", auth, getUserSnippets);
router.post("/", auth, create);
router.put("/:id", auth, update);
router.delete("/:id", auth, deleteSnippet);

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

async function getById(req, res, _) {
    try {
        const snippet = await snippetService.getById(req.params.id);
        if(snippet) {
            return res.json(snippet);
        } else {
            return res.sendStatus(404);
        }
    } catch (err) {
        res.status(400).json({ error: err.message, stack: err.stack });
    }
}

async function getByName(req, res, _) {
    try {
        const snippet = await snippetService.getByName(req.params.name);
        if(snippet) {
            return res.json(snippet);
        } else {
            return res.sendStatus(404);
        }
    } catch (err) {
        res.status(400).json({ error: err.message, stack: err.stack });
    }
}

async function getUserSnippets(req, res, _) {
    try {
        const snippets = await snippetService.getUserSnippets(req.params.userId);
        if(snippets) {
            let response = [];
            Object.values(snippets).forEach(value => {
                response.push({ snippetName: value.name });
            });
            return res.json(response);
        } else {
            return res.sendStatus(404);
        }
    } catch (err) {
        res.status(400).json({ error: err.message, stack: err.stack });
    }
}

async function create(req, res, _) {
    try {
        await snippetService.create(req.body);
        return res.json({}); 
    } catch (err) {
        res.status(400).json({ error: err.message, stack: err.stack });
    }
}

async function update(req, res, _) {
    try {
        await snippetService.update(req.params.id, req.body);
        return res.json({});
    } catch (err) {
        res.status(400).json({ error: err.message, stack: err.stack });
    }
}

async function deleteSnippet(req, res, _) {
    try {
        await snippetService.deleteSnippet(req.params.id);
        return res.json({});
    } catch (err) {
        res.status(400).json({ error: err.message, stack: err.stack });
    }
}