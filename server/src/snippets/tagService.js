const Tag = require("./tagModel");

module.exports = {
  getAll,
  create,
  deleteTag,
};

async function getAll() {
  return await Tag.find();
}

async function create(snippetId, tags) {
  const existingTagNames = await Tag.find({ name: [...tags] });

  if (existingTagNames.length > 0) {
    tags = tags.filter((item) =>
      existingTagNames.every((item2) => item2.name != item)
    );
  }

  let tagIds = [];

  for (const tag of tags) {
    const dbTag = new Tag({
      name: tag,
      snippetId: snippetId,
    });
    await dbTag.save();
    tagIds.push(dbTag._id);
  }
  
  existingTagNames.forEach((tag) => tagIds.push(tag._id));

  return tagIds;
}

async function deleteTag(id) {
  return await Tag.findOneAndRemove(id);
}
