const tagService = require("./tagService");
const { Snippet, validate } = require("./snippetModel");

module.exports = {
    getAll,
    getById,
    getByName,
    getUserSnippets,
    create,
    update,
    deleteSnippet
};

async function getAll() {
    return await Snippet.find();
}

async function getById(id) {
    return await Snippet.findById(id);
}

async function getByName(name) {
    return await Snippet.find({ name });
}

async function getUserSnippets(userId) {
    return await Snippet.find({ userId });
}

async function create(snippetParams) {
    const { erorrs } = validate(snippetParams);

    if (erorrs) {
        throw new Error(error.details[0].message);
    }

    if (await Snippet.findOne({ name: snippetParams.name })) {
        throw new Error("A snippet with the same name already exists.");
    }


    const snippet = new Snippet({
        name: snippetParams.name,
        snippet: snippetParams.snippet,
        userId: snippetParams.userId
    });

    const dbSnippet = await snippet.save();

    let tagIds = [];
    if (snippetParams.tags) {
        const tags = await tagService.create(dbSnippet._id, snippetParams.tags)
        tagIds.push(tags);
        snippet.tagIds = tagIds;
        snippet.save();
    }
}

async function update(id, snippetParams) {
    const snippet = await Snippet.findById(id);

    if (!snippet) {
        throw new Error("Snippet not found");
    }

    if (snippet.name !== snippetParams.name && await Snippet.findOne({ name: snippetParams.name })) {
        throw new Error('The snippet name "' + snippetParams.name + '" is already taken.');
    }

    Object.assign(snippet, snippetParams);

    await snippet.save();
}

async function deleteSnippet(id) {
    await Snippet.findByIdAndRemove(id);
}