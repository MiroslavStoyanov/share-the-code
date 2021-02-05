const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LikeSchema = new Schema({
    userId: { type: String, unique: true, required: true },
    snippetId: { type: String, unique: true, required: true }
});

LikeSchema.set("toJSON", {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.hash;
    }
});

LikeSchema.index({ userId: 1, snippetId: 1 });

module.exports = mongoose.model("Like", LikeSchema);