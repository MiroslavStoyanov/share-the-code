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
    const snippets = await Snippet.find();

    let response = [];
    Object.values(snippets).forEach(value => {
        response.push({ snippetName: value.name });
    });

    return response;
}

async function getById(id) {
    return await Snippet.findById(id);
}

async function getByName(name) {
    return await Snippet.find({ name });
}

async function getUserSnippets(userId) {
    const snippets = await Snippet.find({ userId });

    let response = [];
    Object.values(snippets).forEach(value => {
        response.push({ snippetName: value.name });
    });

    return response;
}

async function create(snippetParams) {
    //TODO: Use mongoose transaction since the inserts are dependent on each other
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
    if (snippetParams.tags.length !== 0) {
        const tags = await tagService.create(dbSnippet._id, snippetParams.tags)
        tagIds.push(tags);
        snippet.tagIds = tagIds;
        await snippet.save();
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