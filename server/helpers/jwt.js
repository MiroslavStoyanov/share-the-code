require("dotenv").config();
const expressJwt = require("express-jwt");
const userService = require("../users/userService");
const secret = process.env.JWT_SECRET;

module.exports = jwt;

function jwt() {
    return expressJwt({ secret, algorithms: ["HS256"], isRevoked })
        .unless({
            path: [
                "/users/authenticate",
                "/users/register"
            ]
        });
}

async function isRevoked(req, payload, done) {
    const user = await userService.getById(payload.sub);

    if (!user) {
        return done(null, true);
    }

    done();
}