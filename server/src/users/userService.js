require("dotenv").config();
const bcrypt = require("bcryptjs");
const { User, validate } = require("./userModel");

module.exports = {
  authenticate,
  getAll,
  getById,
  create,
  update,
  deleteUser,
};

async function authenticate({ username, password }) {
  const user = await User.findOne({ username });
  if (!user) {
    throw new Error({ error: "Invalid login details" });
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    throw new Error({ error: "Invalid login details" });
  }

  if (!user) {
    throw new Error({
      error: "Login failed! Check authentication credentials.",
    });
  }

  await user.generateAuthToken();

  return user;
}

async function getAll() {
  return await User.find();
}

async function getById(id) {
  return await User.findById(id);
}

async function create(userParam) {
  const { error } = validate(userParam);

  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  if (await User.findOne({ username: userParam.username })) {
    throw new Error('Username "' + userParam.username + '" is already taken.');
  }

  if (await User.findOne({ email: userParam.email })) {
    throw new Error('Email "' + userParam.email + '" is already taken.');
  }

  const user = new User(userParam);
  const data = await user.save();
  await user.generateAuthToken();

  return data;
}

async function update(id, userParam) {
  const user = await User.findById(id);

  if (!user) {
    throw new Error("User not found");
  }

  if (
    user.username !== userParam.username &&
    (await User.findOne({ username: userParam.username }))
  ) {
    throw new Error('Username "' + userParam.username + '" is already taken.');
  }

  if (userParam.password) {
    userParam.password = bcrypt.hashSync(userParam.password, 10);
  }

  Object.assign(user, userParam);

  await user.save();
}

async function deleteUser(id) {
  await User.findByIdAndRemove(id);
}
