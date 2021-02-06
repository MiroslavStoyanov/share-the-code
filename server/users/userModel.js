const mongoose = require("mongoose");
const bcrypt = require("mongoose-bcrypt");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true, bcrypt: true },
    firstName: { type: String, required: false },
    lastName: { type: String, required: false },
    email: { type: String, unique: true, required: true },
    createdDate: { type: Date, default: Date.now },
    isAdmin: { type: Boolean, required: false, default: false }
});

UserSchema.set("toJSON", {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.hash;
    }
});

UserSchema.plugin(bcrypt);
UserSchema.index({ username: 1, email: 1 })

module.exports = mongoose.model("User", UserSchema);