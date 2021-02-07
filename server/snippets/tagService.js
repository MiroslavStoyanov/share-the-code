const Tag = require("./tagModel");

module.exports = {
    getAll,
    create,
    deleteTag
};

async function getAll() {
    return await Tag.find();
}

async function create(snippetId, tags) {
    const existingTagNames = await Tag.find({ name: [...tags] });

    if (existingTagNames.length > 0) {
        throw new Error('Tags with names "' + existingTagNames.join(", ") + '" already exist.');
    }
    
    let tagIds = [];

    tags.forEach(tag => {
        const dbTag = new Tag({
            name: tag,
            snippetId: snippetId 
        });
        dbTag.save();
        tagIds.push(dbTag._id);
    });

    return tagIds;
}

async function deleteTag(id){
    return await Tag.findOneAndRemove(id);
}