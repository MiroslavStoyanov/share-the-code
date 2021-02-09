const snippetService = require("./snippetService");
const { Tag, validate } = require("./tagModel");

module.exports = {
  getAll,
  getBySnippetName,
  create,
  deleteTag,
};

async function getAll() {
  return await Tag.find();
}

async function getBySnippetName(snippetName) {
  const snippet = await snippetService.getByName(snippetName);
  const tags = await Tag.find({ snippetId: snippet._id });

  let response = [];
  Object.values(tags).forEach((tag) => {
    response.push(tag.name);
  });

  return response;
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
    const { erorrs } = validate(tag);

    if (erorrs) {
      throw new Error(error.details[0].message);
    }

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
