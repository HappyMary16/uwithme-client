module.exports = {
	globDirectory: 'build/',
	globPatterns: [
		'**/*.{png,json,jpg,ico,html,txt,css,js}'
	],
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	],
	swDest: 'build/sw.js'
};