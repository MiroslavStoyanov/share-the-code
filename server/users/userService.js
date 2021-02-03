require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("./userModel");
const User = db.User;

module.exports = [
    authenticate,
    getAll,
    getById,
    create,
    update,
    deleteUser
];

async function authenticate({ username, password }) {
    const user = await User.findOne({ username });
    if (user && bcrypt.compareSync(password, user.hash)) {
        const token = jwt.sign({ sub: user.id }, process.env.JWT_SECRET, { expiresIn: "7d" });
        return {
            ...user.toJSON(),
            token
        };
    }
}

async function getAll() {
    return await User.find();
}

async function getById(id) {
    return await User.findById(id);
}

async function create(userParam) {
    if (await User.findOne({ username: userParam.username })) {
        throw new Error('Username "' + userParam.username + '" is already taken');
    }

    const user = new User(userParam);

    if (userParam.password) {
        user.hash = bcrypt.hashSync(userParam.password, 10);
    }

    await user.save();
}

async function update(id, userParam) {
    const user = await User.findById(id);

    if (!user) {
        throw new Error('User not found');
    }

    if (user.username !== userParam.username && await User.findOne({ username: userParam.username })) {
        throw new Error('Username "' + userParam.username + '" is already taken');
    }

    if (userParam.password) {
        userParam.hash = bcrypt.hashSync(userParam.password, 10);
    }

    Object.assign(user, userParam);

    await user.save();
}

async function deleteUser(id) {
    await User.findByIdAndRemove(id);
}