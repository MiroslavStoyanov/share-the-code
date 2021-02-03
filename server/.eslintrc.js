module.exports = {
	root: true,
	env: {
		node: true,
		mocha: true
	},
	extends: "eslint:recommended",
	globals: {
		Atomics: "readonly",
		SharedArrayBuffer: "readonly"
	},
	parserOptions: {
		ecmaVersion: 2020
	},
	rules: {
		"eqeqeq": "warn",
        "strict": "off"
	}
};