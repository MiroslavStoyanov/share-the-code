const Snippet = require("./snippetModel");

module.exports = {
    getAll,
    getById,
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

async function getUserSnippets(userId) {
    return await Snippet.find({ userId });
}

async function create(snippetParams) {
    if (await Snippet.findOne({ name: snippetParams.name })) {
        throw new Error("A snippet with the same name already exists.");
    }

    const snippet = new Snippet(snippetParams);

    await snippet.save();
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