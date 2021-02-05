const Tag = require("./tagModel");

module.exports = {
    getAll,
    create,
    deleteTag
};

async function getAll() {
    return await Tag.find();
}

async function create(tags) {
    const existingTagNames = await Tag.find(i => tags.contains(i.name));

    if (existingTagNames) {
        throw new Error('Tags with names "' + existingTagNames.join(", ") + '" already exist.');
    }
    const tagIds = [];

    tags.forEach(tag => {
        const dbTag = new Tag(tag);
        dbTag.save();
        tagIds.add(dbTag.id);
    });

    return tagIds;
}

async function deleteTag(id){
    return await Tag.findOneAndRemove(id);
}