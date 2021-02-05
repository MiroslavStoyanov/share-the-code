const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SnippetSchema = new Schema({
    name: { type: String, unique: true, required: true },
    snippet: { type: String, required: true },
    userId: { type: String, required: true },
    tagIds: { type: Array, required: false }
});

SnippetSchema.set("toJSON", {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.hash;
    }
});

SnippetSchema.index({ name: 1 })

module.exports = mongoose.model("Snippet", SnippetSchema);