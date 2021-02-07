const express = require("express");
const auth = require("../config/auth");
const router = express.Router();
const userService = require("./userService");

router.post("/authenticate", authenticate);
router.post("/register", register);
router.get("/", auth, getAll);
router.get("/current", auth, getCurrent);
router.get("/:id", auth, getById);
router.put("/:id", auth, update);
router.delete("/:id", auth, deleteUser);

module.exports = router;

async function authenticate(req, res, next) {
  try {
    const user = await userService.authenticate(req.body);
    return res.json(user);
  } catch (err) {
    res.status(400).json({ error: err });
  }
}

async function register(req, res, next) {
  try {
    const user = await userService.create(req.body);
    return res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message, stack: err.stack });
  }
}

async function getAll(req, res, next) {
  try {
    const users = await userService.getAll();
    if (users) {
      return res.json(users);
    }
  } catch (err) {
    next(err);
  }
}

async function getCurrent(req, res, next) {
  try {
    const user = await userService.getById(req.user.sub);
    if (user) {
      return res.json(user);
    } else {
      return res.sendStatus(404);
    }
  } catch (err) {
    next(err);
  }
}

async function getById(req, res, next) {
  try {
    const user = await userService.getById(req.params.id);
    if (user) {
      return res.json(user);
    } else {
      return res.sendStatus(404);
    }
  } catch (err) {
    next(err);
  }
}

async function update(req, res, next) {
  try {
    await userService.update(req.params.id, req.body);
    return res.json({});
  } catch (err) {
    next(err);
  }
}

async function deleteUser(req, res, next) {
  try {
    await userService.deleteUser(req.params.id);
    return res.json({});
  } catch (err) {
    next(err);
  }
}
