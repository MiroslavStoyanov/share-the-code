require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Ajv = require("ajv").default;
const userValidationSchema = require("./userValidationSchema.json");
const betterAjvErrors = require("better-ajv-errors");
const User = require("./userModel");
const ajv = new Ajv({ jsonPointers: true });

module.exports = {
    authenticate,
    getAll,
    getById,
    create,
    update,
    deleteUser
};

async function authenticate({ username, password }) {
    const user = await User.findOne({ username });
    if (user && bcrypt.compareSync(password, user.password)) {
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
    const validate = ajv.compile(userValidationSchema);
    const isValid = validate(userParam);
    if (!isValid) {
        const output = betterAjvErrors(userValidationSchema, userParam, validate.errors);
        throw output;
    }

    if (await User.findOne({ username: userParam.username })) {
        throw new Error('Username "' + userParam.username + '" is already taken.');
    }

    if (await User.findOne({ email: userParam.email })) {
        throw new Error('Email "' + userParam.username + '" is already taken.');
    }

    const user = new User(userParam);

    await user.save();
}

async function update(id, userParam) {
    const validate = ajv.compile(userValidationSchema);
    const isValid = validate(userParam);
    if (!isValid) {
        const output = betterAjvErrors(userValidationSchema, userParam, validate.errors);
        throw output;
    }

    const user = await User.findById(id);

    if (!user) {
        throw new Error("User not found");
    }

    if (user.username !== userParam.username && await User.findOne({ username: userParam.username })) {
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