const express = require("express");
const auth = require("../middlewares/auth");
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

async function authenticate(req, res, _) {
  try {
    const user = await userService.authenticate(req.body);
    return await res.json(user);
  } catch (err) {
    await res.status(400).json({ error: err.message, stack: err.stack });
  }
}

async function register(req, res, _) {
  try {
    const user = await userService.create(req.body);
    return await res.status(200).json(user);
  } catch (err) {
    await res.status(400).json({ error: err.message, stack: err.stack });
  }
}

async function getAll(_, res, _) {
  try {
    const users = await userService.getAll();
    if (users) {
      return res.json(users);
    }
  } catch (err) {
    await res.status(400).json({ error: err.message, stack: err.stack });
  }
}

async function getCurrent(req, res, _) {
  try {
    const user = await userService.getById(req.user.sub);
    if (user) {
      return await res.json(user);
    } else {
      return await res.sendStatus(404);
    }
  } catch (err) {
    await res.status(400).json({ error: err.message, stack: err.stack });
  }
}

async function getById(req, res, _) {
  try {
    const user = await userService.getById(req.params.id);
    if (user) {
      return await res.json(user);
    } else {
      return await res.sendStatus(404);
    }
  } catch (err) {
    await res.status(400).json({ error: err.message, stack: err.stack });
  }
}

async function update(req, res, _) {
  try {
    await userService.update(req.params.id, req.body);
    return await res.json({});
  } catch (err) {
    await res.status(400).json({ error: err.message, stack: err.stack });
  }
}

async function deleteUser(req, res, _) {
  try {
    await userService.deleteUser(req.params.id);
    return await res.status(200).json({});
  } catch (err) {
    await res.status(400).json({ error: err.message, stack: err.stack });
  }
}
