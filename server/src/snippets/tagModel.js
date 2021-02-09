const mongoose = require("mongoose");
const Joi = require("joi");
const Schema = mongoose.Schema;

const TagSchema = new Schema({
  name: { type: String, unique: true, required: true },
  snippetId: { type: String, required: true },
});

TagSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
    delete ret.hash;
  },
});

function validateTag(snippetModel) {
  const schema = Joi.object({
    name: Joi.string().max(20).required(),
    snippetId: Joi.string().required(),
  });

  return schema.validate(snippetModel);
}

TagSchema.index({ name: 1 });

const Tag = mongoose.model("Tag", TagSchema);

module.exports.Tag = Tag;
module.exports.validate = validateTag;
