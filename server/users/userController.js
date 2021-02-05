const express = require("express");
const router = express.Router();
const userService = require("./userService");

router.post("/authenticate", authenticate);
router.post("/register", register);
router.get("/", getAll);
router.get("/current", getCurrent);
router.get("/:id", getById);
router.put("/:id", update);
router.delete("/:id", deleteUser);

module.exports = router;

async function authenticate(req, res, next) {
    try {        
        const response = await userService.authenticate(req.body);

        if (response) {
            return res.json(response);
        } else {
            return res.status(400).json({ message: "Username or password is incorrect" });
        }
    }
    catch(err) {
        next(err);
    }
}

async function register(req, res, next) {
    try {
        await userService.create(req.body);
        return res.json({});
    }
    catch(err) {
        next(err);
    }
}

async function getAll(req, res, next) {
    try {
        const users = await userService.getAll();
        if(users) {
            return res.json(users);
        }
    }
    catch(err) {
        next(err);
    }
}

async function getCurrent(req, res, next) {
    try {
        const user = await userService.getById(req.user.sub);
        if(user) {
            return res.json(user);
        } else {
            return res.sendStatus(404);
        }
    }
    catch(err) {
        next(err);
    }
}

async function getById(req, res, next) {
    try {
        const user = await userService.getById(req.params.id);
        if(user) {
            return res.json(user);
        } else {
            return res.sendStatus(404);
        }
    }
    catch(err) {
        next(err);
    }
}

async function update(req, res, next) {
    try {
        await userService.update(req.params.id, req.body)
        return res.json({});
    }
    catch(err) {
        next(err);
    }
}

async function deleteUser(req, res, next) {
    try {
        await userService.deleteUser(req.params.id)
        return res.json({});
    }
    catch(err) {
        next(err);
    }
}