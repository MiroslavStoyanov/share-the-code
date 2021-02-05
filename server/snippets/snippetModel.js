const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SnippetSchema = new Schema({
    name: { type: String, unique: true, required: true },
    snippet: { type: String, required: true },
    userId: { type: String, required: true },
    likesCount: { type: Number, required: false, default: 0 },
    tagIds: { type: Array, required: false, default: [] }
});

SnippetSchema.set("toJSON", {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.hash;
    }
});

SnippetSchema.index({ name: 1, userId: 1 })

module.exports = mongoose.model("Snippet", SnippetSchema);