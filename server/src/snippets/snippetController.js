const express = require("express");
const auth = require("../middlewares/auth");
const router = express.Router();
const snippetService = require("./snippetService");

router.get("/", getAll);
router.get("/:id", getById);
router.get("/name/:name", getByName);
router.get("/user/:userId", auth, getUserSnippets);
router.post("/", auth, create);
router.put("/:id", auth, update);
router.delete("/:name", auth, deleteSnippet);

module.exports = router;

async function getAll(_, res, _) {
    try {
        const response = await snippetService.getAll();
        if (response) {
            return await res.json(response);
        }
    } catch (err) {
        await res.status(400).json({ error: err.message, stack: err.stack });
    }
}

async function getById(req, res, _) {
    try {
        const snippet = await snippetService.getById(req.params.id);
        if(snippet) {
            return await res.json(snippet);
        } else {
            return await res.sendStatus(404);
        }
    } catch (err) {
        await res.status(400).json({ error: err.message, stack: err.stack });
    }
}

async function getByName(req, res, _) {
    try {
        const snippet = await snippetService.getByName(req.params.name);
        if(snippet) {
            return await res.json(snippet);
        } else {
            return await res.sendStatus(404);
        }
    } catch (err) {
        await res.status(400).json({ error: err.message, stack: err.stack });
    }
}

async function getUserSnippets(req, res, _) {
    try {
        const snippets = await snippetService.getUserSnippets(req.params.userId);
        if(snippets) {
            return await res.json(snippets);
        } else {
            return await res.sendStatus(404);
        }
    } catch (err) {
        await res.status(400).json({ error: err.message, stack: err.stack });
    }
}

async function create(req, res, _) {
    try {
        await snippetService.create(req.body);
        return await res.json({}); 
    } catch (err) {
        await res.status(400).json({ error: err.message, stack: err.stack });
    }
}

async function update(req, res, _) {
    try {
        await snippetService.update(req.params.id, req.body);
        return await res.json({});
    } catch (err) {
        await res.status(400).json({ error: err.message, stack: err.stack });
    }
}

async function deleteSnippet(req, res, _) {
    try {
        await snippetService.deleteSnippet(req.params.name);
        return await res.json({});
    } catch (err) {
        await res.status(400).json({ error: err.message, stack: err.stack });
    }
}