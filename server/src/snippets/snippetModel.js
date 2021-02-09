const mongoose = require("mongoose");
const Joi = require("joi");
const Schema = mongoose.Schema;

const SnippetSchema = new Schema({
  name: { type: String, unique: true, required: true },
  snippet: { type: String, required: true },
  userId: { type: String, required: true },
  likesCount: { type: Number, required: false, default: 0 },
  tagIds: { type: Array, required: false, default: [] },
});

SnippetSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
    delete ret.hash;
  },
});

function validateSnippet(snippetModel) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    snippet: Joi.string().min(5).max(5000).required(),
    userId: Joi.string().required(),
  });

  return schema.validate(snippetModel);
}

SnippetSchema.index({ name: 1, userId: 1 });

const Snippet = mongoose.model("Snippet", SnippetSchema);

module.exports.Snippet = Snippet;
module.exports.validate = validateSnippet;
