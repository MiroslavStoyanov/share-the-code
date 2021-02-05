const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TagSchema = new Schema({
    name: { type: String, unique: true, required: true },
    snippetId: { type: String, required: true }
});

TagSchema.set("toJSON", {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.hash;
    }
});

TagSchema.index({ name: 1 })

module.exports = mongoose.model("Tag", TagSchema);